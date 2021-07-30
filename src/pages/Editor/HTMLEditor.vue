<template>
  <q-editor v-model="editor"></q-editor>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HTMLEditor',
  setup () {
    return {
      editor: ref('')
    }
  }
})
</script>
