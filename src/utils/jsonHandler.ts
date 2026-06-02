'use server';

import fs from 'fs';
import path from 'path';

export async function handleJSONfiles<T>(
  filePath: string,
): Promise<(T & { fileName: string })[]> {
  const absolutePath = path.join(process.cwd(), filePath);
  const items: (T & { fileName: string })[] = [];

  let files: string[];
  try {
    files = await fs.promises.readdir(absolutePath);
  } catch (error) {
    console.error(`Failed to read directory: ${absolutePath}`, error);
    return items;
  }

  const jsonFiles = files.filter((file) => path.extname(file) === '.json');

  for (const file of jsonFiles) {
    try {
      const fileData = await fs.promises.readFile(
        path.join(absolutePath, file),
        'utf-8',
      );
      const json = JSON.parse(fileData);
      items.push({
        ...json,
        fileName: path.parse(file).name,
      });
    } catch (error) {
      console.error(`Failed to parse JSON file: ${file}`, error);
    }
  }

  return items;
}

/**
 * @description Function to load a single JSON file from a path with a generic type
 * @param filePath Path to the file relative to the project root
 */
export async function handleJSONfile<T>(filePath: string): Promise<T> {
  const absolutePath = path.join(process.cwd(), filePath);

  try {
    const fileData = await fs.promises.readFile(absolutePath, 'utf-8');
    return JSON.parse(fileData) as T;
  } catch (error) {
    console.error(`Failed to read/parse JSON file: ${absolutePath}`, error);
    throw error;
  }
}
