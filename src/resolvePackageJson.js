module.exports = function resolvePackageJson(packageJson, flags) {
  if (flags.jest) {
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }
    packageJson.scripts.test = "jest";
  }
  return packageJson;
};
