import express = require("express");

import * as gen from "./generate";
import { findSourceFiles } from "./sourceFiles";
import { resolve } from "path";
import { SourceFileManager } from "./sourceFileManager";

const log = console.log.bind(console, "server.ts");

const app = express();
const port = 4004;

const warn = console.warn.bind(console, "server warn");

const sources = new SourceFileManager(
  findSourceFiles(resolve(__dirname, "../components")),
  (...args) => {
    log("definition changed", ...args);
  }
);

app.get("/t8.js", async (_req, res) => {
  const generated = await ;

  res.contentType("application/javascript").end(generated.FnDecl);
});

app.post("/update", async (req, res) => {
  console.log(req.body);
  const { sourceId, key, lang, newTemplate } = req.query;
  await sources.updateKey(lang, sourceId, key, newTemplate);
  res.contentType("application/javascript").end(
    (await gen.makeT8(sources.getFiles(), {
      allowKeyPlaceholders: true,
      allowUnspecifiedModules: true
    })).t8JSEmit
  );
});

app.listen(port, () => {
  console.log(`now listening on http://localhost:${port}`);
});
