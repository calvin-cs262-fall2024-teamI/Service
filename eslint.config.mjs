import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
  //this files dont need to be linted as they are automatically generated
  { ignores: ["**/dev/*", "**/dist/*", "**/tests/*", "tsconfig.json"] },
  eslintConfigPrettier, //plugin to turn off all the rules that are unneccessary of conflict with prettier
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
