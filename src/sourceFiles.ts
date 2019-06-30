import fs = require("fs");
import glob = require("glob");
import { basename } from "path";
import yaml = require("js-yaml");
import { TranslationModule } from "./types";

export class SourceFile {
  private state?: TranslationModule;
  private dirty = false;
  public readonly name: string;

  constructor(public readonly path: string) {
    this.name = basename(this.path).replace(/\..+$/, "");
  }

  async read(): Promise<TranslationModule> {
    if (this.state != null) return Promise.resolve(this.state);
    const text = await fs.promises.readFile(this.path, "utf8");
    const newState = yaml.load(text);
    this.state = newState;
    this.dirty = false;
    return newState;
  }

  update(mod: TranslationModule) {
    this.state = mod;
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

export function findSourceFiles(dir?: string): SourceFile[] {
  return globSourceFiles({ rootDir: dir, glob: "**/*.i18n" });
}

export function globSourceFiles(params: {
  rootDir?: string;
  glob: string;
}): SourceFile[] {
  return glob
    .sync(params.glob, {
      cwd: params.rootDir || ".",
      ignore: "**/node_modules/**"
    })
    .map(i18nPath => new SourceFile(i18nPath));
}
