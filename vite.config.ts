import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { riverVitePlugin } from "./frontend/river.gen.ts";

export default defineConfig({
	plugins: [preact(), riverVitePlugin(), tailwindcss()],
});
