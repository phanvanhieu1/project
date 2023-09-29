// module.exports = {
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     project: 'tsconfig.json',
//     tsconfigRootDir : __dirname,
//     sourceType: 'module',
//   },
//   plugins: ['@typescript-eslint/eslint-plugin'],
//   extends: [
//     'plugin:@typescript-eslint/recommended',
//     'plugin:prettier/recommended',
//   ],
//   root: true,
//   env: {
//     node: true,
//     jest: true,
//   },
//   ignorePatterns: ['.eslintrc.js'],
//   rules: {
//     '@typescript-eslint/interface-name-prefix': 'off',
//     '@typescript-eslint/explicit-function-return-type': 'off',
//     '@typescript-eslint/explicit-module-boundary-types': 'off',
//     '@typescript-eslint/no-explicit-any': 'off',
//   },
// };

module.exports = {
  "root": true,
  "ignorePatterns": ["*/"],
  "plugins": ["@nx"],
  "overrides": [
    {
      "files": [".ts", ".tsx", ".js", ".jsx"],
      "rules": {
        "@nx/enforce-module-boundaries": [
          "error",
          {
            "enforceBuildableLibDependency": true,
            "allow": [],
            "depConstraints": [
              {
                "sourceTag": "*",
                "onlyDependOnLibsWithTags": ["*"]
              }
            ]
          }
        ]
      }
    },
    {
      "files": [".ts", ".tsx"],
      "extends": ["plugin:@nx/typescript"],
      "rules": {}
    },
    {
      "files": [".js", ".jsx"],
      "extends": ["plugin:@nx/javascript"],
      "rules": {}
    },
    {
      "files": [".spec.ts", ".spec.tsx", ".spec.js", ".spec.jsx"],
      "env": {
        "jest": true
      },
      "rules": {}
    }
  ]
}