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
        yarn: {
          type: "boolean",
        },
        git: {
          type: "boolean",
          default: true,
        },
      },
    }
  );

  if (cli.input.length !== 1 || Object.keys(cli.flags).length !== 3) {
    cli.showHelp();
    return;
  }

  main({
    input: cli.input[0],
    options: cli.flags,
  }).catch((error) => {
    if (error.stack) {
      console.log(chalk.red(error.stack));
    } else {
      console.error(chalk.red(error));
    }
  });
};
