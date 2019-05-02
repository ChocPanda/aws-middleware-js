const { resolve } = require('path');
const { ls, exec } = require('shelljs');

exec(`yarn markdown-toc -i ${resolve('./README.md')}`);

ls('-R', 'src')
	.filter(path => path.includes('README'))
	.forEach(readme => exec(`yarn markdown-toc -i ${resolve('src', readme)}`));
