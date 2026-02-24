import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // --- React Refresh (Vite 專用) ---
      // 確保只有 React Component 被 export，這樣 HMR (熱更新) 才會正常運作
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // --- 一般 JavaScript 規則 ---
      // 變數宣告了卻沒使用：設為警告 (開發時比較不會一直報錯阻擋流程)
      // argsIgnorePattern: '^_' 表示如果參數名稱開頭是底線 (例如 _event)，則忽略檢查
      // varsIgnorePattern: '^[A-Z_]' 忽略全大寫常數或底線開頭
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^[A-Z_]' }],

      // 禁止使用 var 宣告變數 (強制用 let 或 const)，這是現代 JS 的基本要求
      'no-var': 'error',
    },
  },
])
