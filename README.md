# blog-admin

A Vue.js Admin Template.

## Features

- [Vue3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### IDE

[Visual Studio Code](https://code.visualstudio.com/)

### Plugins

- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

### settings.json

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
