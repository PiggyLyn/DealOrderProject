module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        'vue/setup-compiler-macros': true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "vue-eslint-parser", /* 解析 .vue 文件 */
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        // "parser": "vue-eslint-parser", /* 解析 .vue 文件 */
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        "vue/no-multiple-template-root": "off"
    }
}
