import path from 'path';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import license from 'rollup-plugin-license';

export default [
	{
		input: 'src/lambda.js',
		output: {
			file: 'dist/bundle.js',
			format: 'cjs',
			preferConst: true
		},
		plugins: [
			resolve(),
			commonjs(),
			license({
				banner: {
					file: path.join(__dirname, 'LICENSE')
				}
			})
		]
	}
];
