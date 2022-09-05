import { readJson, Tree, writeJson } from "@nrwl/devkit";

export default async function (tree: Tree, schema: any) {
  const pkgJson = readJson(tree, "dist/libs/event-bus-core/esm/package.json");

  pkgJson.type = "module";
  delete pkgJson.main;
  pkgJson.exports = {
    "import": "./esm/src/index.js",
    "require": "./cjs/src/index.js",
  };

  writeJson(tree, "dist/libs/event-bus-core/package.json", pkgJson);
}
