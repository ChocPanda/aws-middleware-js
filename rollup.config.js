import { uglify } from 'rollup-plugin-uglify';

export default [
	{
		input: 'src/lambda.js',
		output: {
			dir: 'dist',
			file: 'bundle.js',
			format: 'cjs'
		}
	},
	{
		input: 'src/lambda.js',
		plugins: [uglify({ comments: 'all' })],
		output: {
			dir: 'dist',
			file: 'bundle.min.js',
			format: 'cjs'
		}
	}
];
