import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { glob } from 'glob';
import { basename, join } from 'path';

glob('dist/*.{exe,dmg}')
    .catch((err) => {
        console.error('Error when search files :', err);
        return;
    })
    .then((files) => {
        if (!files || files.length === 0) {
            console.error('No files found');
            return;
        }

        const targetDir = join(__dirname, '..', 'dist', 'executables');

        if (!existsSync(targetDir)) {
            mkdirSync(targetDir, { recursive: true });
        }

        files.forEach((file) => {
            const fileName = basename(file);
            const targetPath = join(targetDir, fileName);
            copyFileSync(file, targetPath);
        });

        console.log('Files copied to dist/executables', files);
    });
