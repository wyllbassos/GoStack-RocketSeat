module.exports = {
    "env": {
        "es2020": true,
        "node": true
    },
    "extends": [
        "airbnb-base",
				"plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
      "no-underscore-dangle": "off",
      "class-methods-use-this": "off",
      "camelcase": 0,
      '@typescript-eslint/camelcase': 'off',
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "_"
      }],
	   	"import/extensions": [
	      "error",
	      "ignorePackages",
	      {
	        "ts": "never"
	      }
      ],
	  },
	  "settings": {
	    "import/resolver": {
	      "typescript": {}
	    }
	  }
};
