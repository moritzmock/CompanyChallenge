module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "ignorePatterns": ["**/*.test.js"],
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": "error"
    }
};
