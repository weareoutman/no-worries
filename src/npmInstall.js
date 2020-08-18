const chalk = require("chalk");
const execa = require("execa");

module.exports = function npmInstall(context, deps, dev = false) {
  if (deps.length === 0) {
    return;
  }

  const args = ["install"];
  if (dev) {
    args.push("--save-dev");
  }
  args.push(...deps);

  console.log(chalk.green(`$ npm ${args.join(" ")}`));
  if (context.dryRun) {
    return;
  }

  return execa("npm", args, {
    cwd: context.absoluteDir,
    stdio: "inherit",
  });
};
