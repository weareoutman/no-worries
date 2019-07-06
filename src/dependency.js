const {
  dependencyRequiredFlags,
  devDependencyRequiredFlags
} = require("./flags");

function resolveAnyDependencies(flags, map) {
  const dependencies = [];
  for (const [packageName, requiredFlags] of Object.entries(map)) {
    if ([].concat(requiredFlags).every(flag => flags[flag] === true)) {
      dependencies.push(packageName);
    }
  }
  return dependencies;
}

function resolveDependencies(flags) {
  return resolveAnyDependencies(flags, dependencyRequiredFlags);
}

function resolveDevDependencies(flags) {
  return resolveAnyDependencies(flags, devDependencyRequiredFlags);
}

module.exports = {
  resolveDependencies,
  resolveDevDependencies
};
