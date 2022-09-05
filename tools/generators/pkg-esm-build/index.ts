import { Tree, updateJson } from "@nrwl/devkit";

export default async function (tree: Tree, schema: any) {
  updateJson(tree, "dist/libs/event-bus-core/esm/package.json", (pkgJson) => {
    pkgJson.type = "module";
    delete pkgJson.main;
    pkgJson.exports = {
      "import": "./src/index.js",
    };
    // return modified JSON object
    return pkgJson;
  });
}
