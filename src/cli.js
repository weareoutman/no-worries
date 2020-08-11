const meow = require("meow");
const chalk = require("chalk");
const main = require("./main");

module.exports = function () {
  const cli = meow(
    `
    Usage
      $ no-worries <project-name>

    Options
      --dry-run, -d  Dry run

    Examples
      $ no-worries awesome-project --dry-run
  `,
    {
      flags: {
        dryRun: {
          type: "boolean",
          alias: "d",
        },
      },
    }
  );

  if (cli.input.length !== 1 || Object.keys(cli.flags).length !== 1) {
    cli.showHelp();
    return;
  }

  main({
    input: cli.input[0],
    dryRun: cli.flags.dryRun,
  }).catch((error) => {
    if (error.stack) {
      console.log(chalk.red(error.stack));
    } else {
      console.error(chalk.red(error));
    }
  });
};
