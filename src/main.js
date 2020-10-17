const fs = require("fs-extra");
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
const getPrettierContent = require("./getPrettierContent");
const gitInit = require("./gitInit");

async function run(context, flags) {
  initDir(context, flags);

  await gitInit(context);

  const deps = resolveDependencies(flags);
  await npmInstall(context, deps, false);

  const devDeps = resolveDevDependencies(flags);
  await npmInstall(context, devDeps, true);

  const files = [];

  const babelrc = resolveBabelrc(flags);
  if (babelrc) {
    files.push([
      ".babelrc",
      getPrettierContent(JSON.stringify(babelrc, null, 2), "json"),
    ]);
  }

  const eslintrc = resolveEslintrc(flags);
  if (eslintrc) {
    files.push([
      ".eslintrc",
      getPrettierContent(JSON.stringify(eslintrc, null, 2), "json"),
    ]);
  }

  const lintstagedrc = resolveLintstagedrc(flags);
  if (lintstagedrc) {
    files.push([
      ".lintstagedrc",
      getPrettierContent(JSON.stringify(lintstagedrc, null, 2), "json"),
    ]);
  }

  const jestConfigJs = resolveJestConfigJs(flags);
  if (jestConfigJs) {
    files.push([
      "jest.config.js",
      getPrettierContent(
        `module.exports = ${JSON.stringify(jestConfigJs, null, 2)};`,
        "babel"
      ),
    ]);
  }

  files.push(...resolveTemplates(flags));

  files.forEach(([filename, content]) => {
    console.log(chalk.green(`$ cat > ${filename}`));
    if (context.dryRun) {
      console.log(content);
      console.log(chalk.gray("^Z"));
    } else {
      fs.outputFileSync(path.join(context.absoluteDir, filename), content);
      console.log(chalk.green("✔"));
    }
  });
}

module.exports = async function main({ input, options }) {
  console.log(
    chalk.green(
      `✨ Choose features of your new project, let ${chalk.bold.italic(
        "NoWorries"
      )} do the stuff, no worries!`
    )
  );
  console.log();

  const { dryRun, yarn, git } = options;

  const context = {
    dryRun: true,
    yarn,
    git,
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

  if (dryRun) {
    console.log();
    console.log(chalk.gray("No worries! It's just a dry run."));
    return;
  }

  const confirmed = await askConfirm();
  if (!confirmed) {
    console.log();
    console.log(chalk.gray("No worries! Maybe next time."));
    return;
  }

  await run(
    {
      ...context,
      dryRun: false,
    },
    flags
  );
  console.log();
  console.log(chalk.green("✨ Done. No worries!"));
};
