const chalk = require("chalk");
const execa = require("execa");

module.exports = function npmInstall(context, deps, dev = false) {
  if (deps.length === 0) {
    return;
  }

  let cmd = "npm";
  const args = [];

  if (context.yarn) {
    cmd = "yarn";
    args.push("add");
    if (dev) {
      args.push("-D");
    }
  } else {
    args.push("install");
    if (dev) {
      args.push("--save-dev");
    }
  }

  args.push(...deps);

  console.log(chalk.green(`$ ${cmd} ${args.join(" ")}`));
  if (context.dryRun) {
    return;
  }

  return execa(cmd, args, {
    cwd: context.absoluteDir,
    stdio: "inherit",
  });
};
