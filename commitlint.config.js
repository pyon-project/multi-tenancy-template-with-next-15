module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["chore", "fix", "init", "feat"]],
  },
};
