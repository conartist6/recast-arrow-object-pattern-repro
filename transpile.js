import * as fs from "fs/promises";
import * as babel from "@babel/core";

const input = await fs.readFile("lib/in.ts", "utf8");

const result = await babel.transformAsync(input, {
  filename: "lib/in.ts",
  presets: ["@babel/preset-typescript"],
  plugins: ["./plugin-recast"],
});

await fs.writeFile("lib/out.js", result.code);
