module.exports = function resolveEslintrc(flags) {
  if (!flags.eslint) {
    return;
  }
  const eslintrc = {
    root: true,
    plugins: [],
    extends: ["eslint:recommended"],
    env: {
      es6: true
    },
    parserOptions: {
      ecmaVersion: 9,
      sourceType: "module"
    }
  };
  if (flags.typescript) {
    eslintrc.parser = "@typescript-eslint/parser";
    eslintrc.extends.push("plugin:@typescript-eslint/eslint-recommended");
    eslintrc.extends.push("plugin:@typescript-eslint/recommended");
    eslintrc.plugins.push("@typescript-eslint");
  }
  if (flags.react) {
    eslintrc.extends.push("plugin:react/recommended");
    eslintrc.plugins.push("react-hooks");
  }
  if (flags.prettier) {
    eslintrc.extends.push("prettier");
    if (flags.typescript) {
      eslintrc.extends.push("prettier/@typescript-eslint");
    }
  }
  if (flags.jest) {
    eslintrc.env.jest = true;
  }
  if (eslintrc.plugins.length === 0) {
    delete eslintrc.plugins;
  }
  if (Object.keys(eslintrc.env).length === 0) {
    delete eslintrc.env;
  }
  return eslintrc;
};
