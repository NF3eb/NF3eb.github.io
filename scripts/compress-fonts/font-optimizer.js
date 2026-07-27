import { compressFonts } from "./font-compressor.js";
import { updateCssFontReferences } from "./css-rewriter.js";

export default function fontOptimizer() {
    return {
        name: "font-optimizer",

        hooks: {
            "astro:build:done": async () => {
                console.log("Running font optimizer...");

                await compressFonts();

                await updateCssFontReferences();
            },
        },
    };
}