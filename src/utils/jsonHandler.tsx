'use server';

import fs from 'fs';
import path from 'path';

export async function handleJSONfiles<T>(
  filePath: string,
): Promise<(T & { fileName: string })[]> {
  const items: (T & { fileName: string })[] = [];

  const jsonsInDir = await fs.promises
    .readdir(filePath)
    .then((files) => files.filter((file) => path.extname(file) === '.json'));

  for (const file of jsonsInDir) {
    const fileData = await fs.promises.readFile(path.join(filePath, file));
    const json = JSON.parse(fileData.toString());

    items.push({
      ...json,
      fileName: path.parse(file).name,
    });
  }

  return items;
}

/**
 * @description Function to load a single JSON file from a path with a generic type
 * @param filePath Path to the file relative to the project root
 */
export async function handleJSONfile<T>(filePath: string): Promise<T> {
  const absolutePath = path.join(process.cwd(), filePath);
  const fileData = await fs.promises.readFile(absolutePath);
  const json = JSON.parse(fileData.toString());

  return json as T;
}
