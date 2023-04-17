module.exports = {
	style: {
		css: {
			loaderOptions: {
				url: false,
			}
		}
	},
	babel: {
		plugins: [["@babel/plugin-proposal-decorators", { "legacy": true }]]
	},
	eslint: {
		configure: {
			parserOptions: {
				ecmaFeatures: {
					legacyDecorators: true,
				}
			},
			rules: {
				'no-unused-vars': 0,
				'jsx-a11y/anchor-is-valid': 0,
				'jsx-a11y/alt-text': 0,
				'react-hooks/exhaustive-deps': 0,
				'eqeqeq': 0,
				'react/jsx-no-target-blank': 0,
				'no-useless-constructor': 0,
				'default-case': 0,
				'no-useless-concat': 0,
				'no-mixed-operators': 0,
				'array-callback-return': 0,
				'jsx-a11y/img-redundant-alt': 0,
				'react/jsx-no-duplicate-props': 0,
				'jsx-a11y/iframe-has-title': 0,
				'no-useless-escape': 0,
				'no-dupe-keys': 0,
				'no-redeclare': 0,
				'no-throw-literal': 0,
				'jsx-a11y/iframe-has-title': 0,
				'no-redeclare': 0,
				'no-use-before-define': 0,
				'no-whitespace-before-property': 0,
				'no-fallthrough': 0,
				'no-extend-native': 0,
			}
		}
	}
}
