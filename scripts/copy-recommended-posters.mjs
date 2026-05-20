import { copyFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cursorAssets = join(
  root,
  '..',
  '..',
  '.cursor',
  'projects',
  'c-Users-Xusratbek-Desktop-kinoteatr-app',
  'assets'
);

const prefix =
  'c__Users_Xusratbek_AppData_Roaming_Cursor_User_workspaceStorage_0ed7c6e440139e2bf3560214e553b9f0_images_';

const outDir = join(root, 'assets', 'images');
mkdirSync(outDir, { recursive: true });

const copies = [
  [`${prefix}image_50-3b343777-4561-4466-bfa6-03a2606c8cc8.png`, 'rec-watchmen.png'],
  [`${prefix}image_53-f3fe0234-06ea-4f05-b655-01a87fcd7089.png`, 'rec-peacemaker.png'],
  [`${prefix}Frame_2087330870-6c851d03-2a1a-49ec-a607-bd7aafb0e04a.png`, 'rec-misfits.png'],
];

for (const [srcName, destName] of copies) {
  copyFileSync(join(cursorAssets, srcName), join(outDir, destName));
  console.log('Copied', destName);
}
