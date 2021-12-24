<script setup lang="ts">
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { onMounted, onUnmounted, ref, unref, watch } from 'vue';

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
  // options: {
  //   type: Object,
  // },
  modelValue: {
    type: String,
    default: '',
  },
  minHeight: {
    type: Number,
    default: 360,
  },
  placeholder: {
    type: String,
    default: '',
  },
});

const contentEditor = ref<Vditor | null>();
const editorRef = ref<string | HTMLElement>();

const show = ref(true);

onMounted(() => {
  contentEditor.value = new Vditor(editorRef.value as HTMLElement, {
    // ...props.options,
    value: props.modelValue,
    minHeight: props.minHeight,
    placeholder: props.placeholder,
    toolbar: [
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
    after() {
      // emit('after', toRaw(contentEditor.value));
      show.value = false;
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
