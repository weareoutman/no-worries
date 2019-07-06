const defaultFlags = {
  babel: true,
  editorConfig: true,
  enzyme: false,
  eslint: true,
  husky: true,
  jest: true,
  lerna: false,
  lintStaged: true,
  prettier: true,
  react: false,
  typescript: false,
  useWorkspaces: false,
  yarn: false
};

const devDependencyRequiredFlags = {
  "@babel/core": "babel",
  "@babel/preset-env": "babel",
  "@babel/preset-react": ["babel", "react"],
  "@babel/preset-typescript": ["babel", "typescript"],
  "@types/enzyme": ["enzyme", "typescript"],
  "@types/enzyme-adapter-react-16": ["enzyme", "typescript"],
  "@types/jest": ["jest", "typescript"],
  "@types/react": ["react", "typescript"],
  "@types/react-dom": ["react", "typescript"],
  "@typescript-eslint/eslint-plugin": ["eslint", "typescript"],
  "@typescript-eslint/parser": ["eslint", "typescript"],
  "babel-jest": ["babel", "jest"],
  enzyme: "enzyme",
  "enzyme-adapter-react-16": "enzyme",
  "enzyme-to-json": "enzyme",
  eslint: "eslint",
  "eslint-config-prettier": ["eslint", "prettier"],
  "eslint-plugin-react": ["eslint", "react"],
  "eslint-plugin-react-hooks": ["eslint", "react"],
  husky: "husky",
  jest: "jest",
  lerna: "lerna",
  "lint-staged": "lintStaged",
  prettier: "prettier",
  typescript: "typescript"
};

const dependencyRequiredFlags = {
  react: "react",
  "react-dom": "react"
};

module.exports = {
  defaultFlags,
  dependencyRequiredFlags,
  devDependencyRequiredFlags
};
