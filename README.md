# blog-admin

This template should help get you started developing with Vue 3 in Vite.

## Getting Started

### IDE

[Visual Studio Code](https://code.visualstudio.com/)

### Plugins

1. [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
2. [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
3. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
4. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
5. [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
6. [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

### Settings.json

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "vue"],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.emmetCompletions": true,
  "typescript.suggest.paths": false,
  "javascript.suggest.paths": false,
  "path-intellisense.mappings": {
    "@": "${workspaceFolder}/src"
  },
}

```

### Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm run dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm run lint
```
