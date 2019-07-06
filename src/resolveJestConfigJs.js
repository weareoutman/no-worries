module.exports = function resolveJestConfigJs(flags) {
  if (!flags.jest) {
    return;
  }
  const jestConfigJs = {};
  if (flags.babel) {
    Object.assign(jestConfigJs, {
      transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
      }
    });
  }
  if (flags.enzyme) {
    Object.assign(jestConfigJs, {
      setupFilesAfterEnv: ["<rootDir>/__jest__/setup.js"],
      snapshotSerializers: ["enzyme-to-json/serializer"]
    });
  }
  if (Object.keys(jestConfigJs).length === 0) {
    return;
  }
  return jestConfigJs;
};
