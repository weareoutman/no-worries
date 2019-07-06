const inquirer = require("inquirer");
const { defaultFlags } = require("./flags");

async function askFeatures() {
  const choices = [
    {
      name: "Babel",
      value: "babel"
    },
    {
      name: "Editor Config",
      value: "editorConfig"
    },
    {
      name: "Enzyme",
      value: "enzyme"
    },
    {
      name: "Eslint",
      value: "eslint"
    },
    {
      name: "Husky",
      value: "husky"
    },
    {
      name: "Jest",
      value: "jest"
    },
    {
      name: "Lint Staged",
      value: "lintStaged"
    },
    {
      name: "Prettier",
      value: "prettier"
    },
    {
      name: "React",
      value: "react"
    },
    {
      name: "TypeScript",
      value: "typescript"
    }
  ];
  return (await inquirer.prompt({
    type: "checkbox",
    name: "features",
    choices: choices,
    pageSize: choices.length,
    default: Object.entries(defaultFlags)
      .filter(f => f[1])
      .map(f => f[0])
  })).features;
}

async function askConfirm() {
  return (await inquirer.prompt({
    type: "confirm",
    name: "confirmed",
    message: "Is it what you want?",
    default: true
  })).confirmed;
}

module.exports = {
  askFeatures,
  askConfirm
};
