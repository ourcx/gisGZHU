import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";


module.exports = {
  "env": {
      "browser": true,
      "es2021": true,
      "node": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:vue/vue3-essential",
      "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
  ],
  // 配置解析vue文件
  "parser":"vue-eslint-parser",
  "parserOptions": {
      "ecmaVersion": "latest",
      "parser": "@typescript-eslint/parser",
      "sourceType": "module"
  },
  "plugins": [
      "vue",
      "@typescript-eslint"
  ],
 // 添加规则
 "rules": {
   "@typescript-eslint/ban-types": [
      "error",
      {
          "extendDefaults": true,
          "types": {
              "{}": false
          }
      }
    ]
  }
}
