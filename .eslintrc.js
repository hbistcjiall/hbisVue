// http://eslint.org/docs/user-guide/configuring

module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    "rules": {
        "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]
    }
}