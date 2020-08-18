module.exports = function resolvePackageJson(packageJson, flags) {
  if (flags.jest) {
    addScript(packageJson, "test", "jest");
  }
  if (flags.standardVersion) {
    addScript(packageJson, "release", "standard-version");
  }
  return packageJson;
};

function addScript(packageJson, name, script) {
  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }
  packageJson.scripts[name] = script;
}
