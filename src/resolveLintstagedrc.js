module.exports = function resolveLintstagedrc(flags) {
  if (!flags.lintStaged) {
    return;
  }
  const lintstagedrc = {};
  if (flags.prettier) {
    Object.assign(lintstagedrc, {
      "*.{js,ts,jsx,tsx}": ["prettier --write", "git add"],
      "*.css": ["prettier --write", "git add"],
      "*.html": ["prettier --write", "git add"],
      "*.md": ["prettier --write", "git add"],
      "*.json": ["prettier --write", "git add"]
    });
    if (flags.eslint) {
      lintstagedrc["*.{js,ts,jsx,tsx}"].unshift("eslint --fix --quiet");
    }
  } else if (flags.eslint) {
    Object.assign(lintstagedrc, {
      "*.{js,ts,jsx,tsx}": ["eslint --fix --quiet", "git add"]
    });
  }
  if (Object.keys(lintstagedrc).length === 0) {
    return;
  }
  return lintstagedrc;
};
