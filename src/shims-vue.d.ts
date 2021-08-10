// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}

declare module '@ckeditor/ckeditor5-build-classic'
declare module '@ckeditor/ckeditor5-vue'
