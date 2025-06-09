import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";
import SVGSpriter from "svg-sprite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spriter = new SVGSpriter({
  mode: {
    symbol: {
      dest: ".",
      sprite: "sprite.svg",
    },
  },
});

const iconsPath = resolve(__dirname, "src/icons");

readdirSync(iconsPath).forEach(file => {
  spriter.add(
    join(iconsPath, file),
    null,
    readFileSync(join(iconsPath, file), "utf-8")
  );
});

spriter.compile((error, result) => {
  if (error) throw error;
  writeFileSync(
    resolve(__dirname, "public/sprite.svg"),
    result.symbol.sprite.contents
  );
  console.log("✅ sprite.svg створено успішно!");
});
