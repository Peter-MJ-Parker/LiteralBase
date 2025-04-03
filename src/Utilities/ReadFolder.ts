import * as fs from 'fs';
import * as pathModule from 'path';

export default function (path: string, depth = 2) {
  return readFolder(path, depth, []);
}

function readFolder(path: string, depth = 2, files: string[]) {
  if (depth < 0) return files;

  const entries = fs.readdirSync(path, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = pathModule.join(path, entry.name);

    if (entry.isDirectory()) {
      readFolder(fullPath, depth - 1, files);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(fullPath);
    }
  }

  return files;
}
