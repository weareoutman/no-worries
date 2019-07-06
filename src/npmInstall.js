const chalk = require("chalk");
const ora = require("ora");
const promisedSpawn = require("./promisedSpawn");

module.exports = async function npmInstall(context, deps, dev = false) {
  if (deps.length === 0) {
    return;
  }
  const args = ["install"];
  if (dev) {
    args.push("--save-dev");
  }

  console.log(chalk.green(`$ npm ${args.concat(deps).join(" ")}`));
  if (context.dryRun) {
    return;
  }
  const spinner = ora().start();
  try {
    await promisedSpawn("npm", args.concat(deps), {
      cwd: context.absoluteDir,
      encoding: "utf8"
    });
    spinner.succeed();
    // console.log(output.toString());
  } catch (e) {
    spinner.fail();
    console.log(chalk.keyword("orange")(e.output.toString()));
    if (e.error) {
      throw e.error;
    }
    process.exit(e.code);
  }
};
