module.exports = {
	branch: 'master',
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		[
			'@semantic-release/npm',
			{
				npmPublish: false,
				pkgRoot: 'dist',
				tarballDir: 'dist'
			}
		],
		[
			'@semantic-release/github',
			{
				assets: 'dist/*.tgz'
			}
		]
	]
};
