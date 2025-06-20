import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { RLRecord } from "../types/index.js";

const OUTPUT_DIR = join(process.cwd(), "outputs");

export async function saveHistory(history: RLRecord[]) {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const file = join(OUTPUT_DIR, `${Date.now()}.json`);
  await writeFile(file, JSON.stringify(history, null, 2));
}
