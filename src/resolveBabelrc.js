module.exports = function resolveBabelrc(flags) {
  if (!flags.babel) {
    return;
  }
  const babelrc = { presets: ["@babel/preset-env"] };
  if (flags.react) {
    babelrc.presets.push("@babel/preset-react");
  }
  if (flags.typescript) {
    babelrc.presets.push("@babel/preset-typescript");
  }
  return babelrc;
};
