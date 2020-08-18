module.exports = function resolveLintstagedrc(flags) {
  if (!flags.lintStaged) {
    return;
  }
  const lintstagedrc = {};
  if (flags.prettier) {
    Object.assign(lintstagedrc, {
      "*.{js,ts,jsx,tsx}": ["prettier --write"],
      "*.css": ["prettier --write"],
      "*.html": ["prettier --write"],
      "*.md": ["prettier --write"],
      "*.json": ["prettier --write"],
    });
    if (flags.eslint) {
      lintstagedrc["*.{js,ts,jsx,tsx}"].unshift("eslint --fix --quiet");
    }
  } else if (flags.eslint) {
    Object.assign(lintstagedrc, {
      "*.{js,ts,jsx,tsx}": ["eslint --fix --quiet"],
    });
  }
  if (Object.keys(lintstagedrc).length === 0) {
    return;
  }
  // Keep the configuration be simple.
  return Object.fromEntries(
    Object.entries(lintstagedrc).map(([key, value]) => [
      key,
      value.length === 1 ? value[0] : value,
    ])
  );
};
