import { TranslationModule } from "./types";
import { promises } from "fs";
import * as yaml from "js-yaml";
import * as glob from "glob";
import { basename } from "path";

export type SourceFile = Readonly<{
  name: string;
  path: string;
}>;

export function loadSource(file: SourceFile): Promise<TranslationModule> {
  return promises
    .readFile(file.path, "utf8")
    .then(contents => yaml.load(contents));
}

export function saveSource(
  file: SourceFile,
  tm: TranslationModule
): Promise<void> {
  return promises.writeFile(file.path, yaml.dump(tm, { noRefs: true }));
}

export function findSourceFiles(dir: string): Promise<SourceFile[]> {
  return new Promise((resolve, reject) => {
    glob(
      "**/*.i18n",
      { cwd: dir, ignore: ["**/node_modules/**"] },
      (err, matches) => {
        if (err) return reject(err);

        resolve(
          matches.map(i18nPath => (Object.freeze({
            path: i18nPath,
            name: basename(this.path).replace(/\..+$/, "")
          })))
        );
      }
    );
  });
}
