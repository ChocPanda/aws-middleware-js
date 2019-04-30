import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [
	{
		input: 'src/lambda.js',
		output: {
			file: 'dist/bundle.js',
			format: 'cjs',
			preferConst: true
		},
		plugins: [resolve(), commonjs()]
	}
];
