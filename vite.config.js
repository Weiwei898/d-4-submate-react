import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { fileURLToPath, URL } from "node:url";
import path from "node:path";
import { glob } from "glob";

// https://vite.dev/config/
export default defineConfig({
    /**
     * 1. 設定基礎路徑 (GitHub Pages 部署用)
     * 採用三元運算：正式環境使用 Repo 名稱，開發環境使用根目錄。
     */
    base: process.env.NODE_ENV === "production" ? "/d-4-submate-react/" : "/",

    plugins: [
        /**
         * 2. React 核心插件
         * 同時保留 React 支援與 EJS 模板編譯功能，方便過渡期使用。
         */
        react(),
        ViteEjsPlugin(),
    ],

    resolve: {
        /**
         * 3. 設定路徑別名 (非常重要！)
         * 這能解決 SCSS 藏太深導致圖片路徑難寫的問題。
         * 設定後，可以使用 '@' 代表 'src' 資料夾。
         */
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },

    /**
     * 4. 混合編譯設定 (過渡期專用)：
     * 為了保留舊有的 EJS 頁面，我們重新啟用了 rollupOptions 的多入口設定。
     * 這會同時編譯根目錄的 index.html (React 進入點)
     * 以及 pages 資料夾下的所有舊版 HTML 頁面。
     */
    build: {
        outDir: "dist",
        // 這裡可以自定義產出的靜態資源資料夾名稱 (預設是 assets)
        assetsDir: "assets",
        rollupOptions: {
            input: {
                // 主進入點 (React)
                main: fileURLToPath(new URL("./index.html", import.meta.url)),
                // 舊版頁面進入點 (EJS/HTML)
                ...Object.fromEntries(
                    glob
                        .sync("pages/**/*.html")
                        .map((file) => [
                            path.relative(
                                "pages",
                                file.slice(
                                    0,
                                    file.length - path.extname(file).length,
                                ),
                            ),
                            fileURLToPath(new URL(file, import.meta.url)),
                        ]),
                ),
            },
        },
    },

    server: {
        // 預設開啟首頁(React)，若想直接看舊版頁面可改為 'pages/index.html'
        open: true,
        //open: 'pages/index.html',
    },
});
