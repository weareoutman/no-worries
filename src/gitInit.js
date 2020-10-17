const chalk = require("chalk");
const execa = require("execa");

module.exports = async function gitInit(context) {
  if (context.git) {
    console.log(chalk.green(`$ git init`));
    if (!context.dryRun) {
      await execa("git", ["init"], {
        cwd: context.absoluteDir,
        stdio: "inherit",
      });
    }
  }
};
