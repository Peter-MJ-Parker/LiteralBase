import fs from 'fs';
import pathModule from 'path';

export default function (path: string, depth = 2) {
  path = `${process.cwd()}/build/${path}`;
  const files: string[] = [];
  const stack: { path: string; depth: number }[] = [{ path, depth }];

  while (stack.length > 0) {
    const { path: currentPath, depth: currentDepth } = stack.pop()!;
    if (currentDepth < 0) continue;

    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = pathModule.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        stack.push({ path: fullPath, depth: currentDepth - 1 });
      } else if (entry.isFile() && entry.name.endsWith('.js')) {
        files.push(fullPath);
      }
    }
  }

  return files;
}
