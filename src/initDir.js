const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const resolvePackageJson = require("./resolvePackageJson");
const getPrettierContent = require("./getPrettierContent");

module.exports = function initDir(context, flags) {
  const packageJson = getPrettierContent(
    JSON.stringify(
      resolvePackageJson(
        {
          name: context.packageName,
        },
        flags
      )
    ),
    "json"
  );

  console.log(chalk.green(`$ mkdir ${context.relativeDir}`));
  if (!context.dryRun) {
    fs.mkdirSync(context.absoluteDir);
  }
  console.log(chalk.green(`$ cd ${context.relativeDir}`));
  console.log(chalk.green("$ cat > package.json"));
  if (context.dryRun) {
    console.log(packageJson);
    console.log(chalk.gray("^Z"));
  } else {
    fs.writeFileSync(
      path.join(context.absoluteDir, "package.json"),
      packageJson
    );
    console.log(chalk.green("✔"));
  }
};
