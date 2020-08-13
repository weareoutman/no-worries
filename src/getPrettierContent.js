const prettier = require("prettier");

module.exports = function getPrettierContent(content, parser) {
  return prettier.format(content, { parser });
};
