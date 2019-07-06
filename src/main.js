const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { askFeatures, askConfirm } = require("./ask");
const initDir = require("./initDir");
const npmInstall = require("./npmInstall");
const { resolveDependencies, resolveDevDependencies } = require("./dependency");
const resolveBabelrc = require("./resolveBabelrc");
const resolveEslintrc = require("./resolveEslintrc");
const resolveJestConfigJs = require("./resolveJestConfigJs");
const resolveLintstagedrc = require("./resolveLintstagedrc");
const resolveTemplates = require("./resolveTemplates");

async function run(context, flags) {
  initDir(context, flags);

  const deps = resolveDependencies(flags);
  await npmInstall(context, deps, false);

  const devDeps = resolveDevDependencies(flags);
  await npmInstall(context, devDeps, true);

  const files = [];

  const babelrc = resolveBabelrc(flags);
  if (babelrc) {
    files.push([".babelrc", JSON.stringify(babelrc, null, 2)]);
  }

  const eslintrc = resolveEslintrc(flags);
  if (eslintrc) {
    files.push([".eslintrc", JSON.stringify(eslintrc, null, 2)]);
  }

  const lintstagedrc = resolveLintstagedrc(flags);
  if (lintstagedrc) {
    files.push([".lintstagedrc", JSON.stringify(lintstagedrc, null, 2)]);
  }

  const jestConfigJs = resolveJestConfigJs(flags);
  if (jestConfigJs) {
    files.push([
      "jest.config.js",
      `module.exports = ${JSON.stringify(jestConfigJs, null, 2)};`
    ]);
  }

  files.push(...resolveTemplates(flags));

  files.forEach(([filename, content]) => {
    console.log(chalk.green(`$ cat > ${filename}`));
    if (context.dryRun) {
      console.log(content);
      console.log(chalk.gray("^Z"));
    } else {
      fs.writeFileSync(path.join(context.absoluteDir, filename), content);
      console.log(chalk.green("✔"));
    }
  });
}

module.exports = async function main({ input, dryRun }) {
  console.log(
    chalk.green(
      `✨ Choose features of your new project, let ${chalk.bold.italic(
        "NoWorries"
      )} do the stuff, no worries!`
    )
  );
  console.log();

  const context = {
    dryRun: true
  };
  const cwd = process.cwd();
  context.absoluteDir = path.resolve(cwd, input);
  context.relativeDir = path.relative(cwd, context.absoluteDir);
  if (fs.existsSync(context.absoluteDir)) {
    throw new Error(`target dir existed: ${context.relativeDir}`);
  }
  context.packageName = path.basename(context.absoluteDir);
  const checkedFlags = await askFeatures();
  const flags = checkedFlags.reduce((acc, f) => {
    acc[f] = true;
    return acc;
  }, {});

  await run(context, flags);

  if (!dryRun) {
    const confirmed = await askConfirm();
    if (confirmed) {
      await run(
        {
          ...context,
          dryRun: false
        },
        flags
      );
      console.log();
      console.log(chalk.green("✨ Done. No worries!"));
    } else {
      console.log();
      console.log(chalk.gray("No worries! Maybe next time."));
    }
  } else {
    console.log();
    console.log(chalk.gray("No worries! It's just a dry run."));
  }
};
