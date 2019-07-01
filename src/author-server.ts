import express = require("express");

import { SourceFileManager } from "./sourceFileManager";
import { makeJS, GenOptions } from "./gen";

export function start(opts: GenOptions) {
  const log = console.log.bind(console, "[log]");
  const err = console.error.bind(console, "[err]");

  const app = express();
  const port = 4004;

  const sources = new SourceFileManager(opts.sourceFiles, (...args) => {
    log("definition changed", ...args);
  });

  app.get("/", (_req, res) => {
    console.log(sources.getFiles());
    res.json({
      sources: sources.getFiles().map(sf => sf.path)
    });
  });

  app.get("/whoa.js", async (_req, res) => {
    res.contentType("application/javascript").end(await makeJS(opts));
  });

  app.post("/update", async (req, res) => {
    console.log(req.body);
    const { sourceId, key, lang, newTemplate } = req.query;
    await sources.updateKey(lang, sourceId, key, newTemplate);
    res.status(200).send("updated");
  });

  app.post("/save", async (_req, res) => {
    await sources.saveAll();
    res.status(200).send("saved");
  });

  app.get("/test", async (_req, res) => {
    res.contentType("text/html").status(200).end(`
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
      <form action="/update" method="post">
      <label for="module">Source ID</label>
      <input name="sourceId" type="text" id="module">
      <br>
      <label for="key">Key</label>
      <input name="key" type="text" id="key">
      <br>
      <label for="variant">Variant</label>
      <input name="variant" type="text" id="variant">
      <br>
      <label for="template">Template</label>
      <input name="template" type="text" id="template">
      <br>
      <label for="lang">Lang</label>
      <input name="lang" type="text" id="lang">
      <br>
      <input type="submit">
      </form>
      </body>
    </html>
    `);
  });

  app.use(
    (
      error: Error,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      err(error.name, error.stack);
      res
        .status(500)
        .send(error.name + ": " + error.message + "\n\n" + error.stack);
    }
  );

  app.listen(port, () => {
    console.log(`now listening on http://localhost:${port}`);
  });
}
