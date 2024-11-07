import fse from 'fs-extra';
import path from 'path';
const topDir = './';

if (process.env.NODE_ENV !== 'production')  {
	console.log('Not in production mode, skipping postinstall script');

	process.exit(0)
} else {
	fse.emptyDirSync(path.join(topDir, 'public', 'node_modules/tinymce'));
	fse.copySync(
		path.join(topDir, 'node_modules', 'tinymce'),
		path.join(topDir, 'public', 'node_modules/tinymce'),
		{ overwrite: true }
	);

	console.log('Copied tinymce to public - postinstall script complete');
}
