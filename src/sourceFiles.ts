import fs = require("fs");
import glob = require("glob");
import { basename, resolve } from "path";
import yaml = require("js-yaml");
import { TranslationModule } from "./types";
import { cloneDeep } from "lodash";
import { promisify } from "util";

export class SourceFile {
  private state?: TranslationModule;
  private dirty = false;
  public readonly name: string;

  constructor(public readonly path: string) {
    this.name = basename(this.path).replace(/\..+$/, "");
  }

  /** resolves deep cloned values */
  async read(): Promise<TranslationModule> {
    if (this.state != null) return Promise.resolve(cloneDeep(this.state));
    const text = await fs.promises.readFile(this.path, "utf8");
    const newState = yaml.load(text);
    this.state = newState;
    this.dirty = false;
    return cloneDeep(newState);
  }

  /** sets state to a deep cloned value */
  update(mod: TranslationModule) {
    this.state = cloneDeep(mod);
    this.dirty = true;
  }

  async save(): Promise<void> {
    if (this.dirty) {
      await fs.promises.writeFile(this.path, yaml.dump(this.state));
      this.dirty = false;
    } else {
      return Promise.resolve();
    }
  }
}

const globAsync = promisify(glob);

export async function findSourceFiles(params: {
  rootDir: string;
  include: string[];
  exclude: string[];
}): Promise<SourceFile[]> {
  params.include.forEach(pattern => {
    if (pattern.includes(","))
      throw new Error(`Unrecognized character "," in include pattern`);
    if (pattern.includes("{"))
      throw new Error(`Unrecognized character "{" in include pattern`);
    if (pattern.includes("}"))
      throw new Error(`Unrecognized character "}" in include pattern`);
  });

  const pattern =
    params.include.length === 1
      ? params.include[0]
      : `{${params.include.join(",")}}`;

  console.log({ pattern, include: params.include });

  return globAsync(pattern, {
    nodir: true,
    cwd: params.rootDir,
    ignore: params.exclude
  }).then(paths =>
    paths.map(path => new SourceFile(resolve(params.rootDir, path)))
  );
}
