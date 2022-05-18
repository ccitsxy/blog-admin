<script setup lang="ts">
import {
  onMounted,
  ref,
  watch,
  toRaw,
  onUnmounted,
  unref,
  inject,
  type Ref,
} from 'vue';
import type { GlobalTheme } from 'naive-ui';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

const emit = defineEmits([
  'update:modelValue',
  'after',
  'focus',
  'blur',
  'esc',
  'ctrlEnter',
  'select',
]);

const props = defineProps({
  options: {
    type: Object,
    default() {
      return {};
    },
  },
  modelValue: {
    type: String,
    default: '',
  },
});

const contentEditor = ref<Vditor | null>(null);
const editorRef = ref<HTMLElement | null>(null);

const theme = inject<Ref<GlobalTheme | null>>('theme');

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  contentEditor.value = new Vditor(editorRef.value!, {
    ...props.options,
    value: props.modelValue,
    toolbar: [
      // "emoji",
      'headings',
      'bold',
      'italic',
      'strike',
      'link',
      '|',
      'list',
      'ordered-list',
      'check',
      'outdent',
      'indent',
      '|',
      'quote',
      'line',
      'code',
      'inline-code',
      'insert-before',
      'insert-after',
      '|',
      'upload',
      // "record",
      'table',
      '|',
      'undo',
      'redo',
      '|',
      'fullscreen',
      'edit-mode',
      {
        name: 'more',
        toolbar: [
          'both',
          'code-theme',
          'content-theme',
          'export',
          'outline',
          'preview',
          'devtools',
          'info',
          'help',
        ],
      },
    ],
    cache: {
      enable: false,
    },
    fullscreen: {
      index: 3000,
    },
    preview: {
      hljs: {
        lineNumber: true,
      },
    },
    after() {
      contentEditor.value?.setTheme(
        theme?.value ? 'dark' : 'classic',
        theme?.value ? 'dark' : 'light',
        'native'
      );
      emit('after', toRaw(contentEditor.value));
    },
    input(value: string) {
      emit('update:modelValue', value);
    },
    focus(value: string) {
      emit('focus', value);
    },
    blur(value: string) {
      emit('blur', value);
    },
    esc(value: string) {
      emit('esc', value);
    },
    ctrlEnter(value: string) {
      emit('ctrlEnter', value);
    },
    select(value: string) {
      emit('select', value);
    },
  });
});

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== contentEditor.value?.getValue()) {
      contentEditor.value?.setValue(newVal);
    }
  }
);

watch(
  () => theme?.value,
  (newVal) => {
    contentEditor?.value?.setTheme(
      newVal ? 'dark' : 'classic',
      newVal ? 'dark' : 'light'
    );
  }
);

onUnmounted(() => {
  const editorInstance = unref(contentEditor);
  if (!editorInstance) return;
  try {
    editorInstance?.destroy?.();
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div ref="editorRef"></div>
</template>

<style>
.vditor {
  padding: 0.5px;
}
.vditor--fullscreen {
  padding: 0;
  border: 0;
}
</style>
