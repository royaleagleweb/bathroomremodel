import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

export function getUploadedImages(): string[] {
  const dir = path.join(process.cwd(), "public", "uploads");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXT.test(f) && !f.startsWith("."))
      .sort()
      .map((f) => `/uploads/${f}`);
  } catch {
    return [];
  }
}
