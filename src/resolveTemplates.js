const fs = require("fs");
const path = require("path");

module.exports = function resolveTemplates(flags) {
  const templates = [".gitignore"];
  if (flags.editorConfig) {
    templates.push(".editorconfig");
  }
  if (flags.husky && flags.lintStaged) {
    templates.push(".huskyrc");
  }
  if (flags.jest && flags.enzyme) {
    templates.push("__jest__/setup.js");
  }

  return templates.map(filename => [
    filename,
    fs.readFileSync(path.resolve(__dirname, "../template", filename), "utf8")
  ]);
};
