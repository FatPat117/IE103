import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

// Định nghĩa __dirname theo cách tương tự như trong CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "src"),
        },
    },
    server: {
        port: 3000, 
    },
});
