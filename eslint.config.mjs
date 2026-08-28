import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ["dist", ".next", ".vinext", ".wrangler", "node_modules"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
);
