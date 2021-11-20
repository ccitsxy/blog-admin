<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const panes = ref([
  {
    title: router.currentRoute.value.meta?.title,
    content: 'Content of Tab',
    key: router.currentRoute.value.path
  }
]);

const activeKey = ref(panes.value[0].key);

router.beforeEach(to => {
  activeKey.value = to.path;
  if (panes.value.some(p => p.key === to.path)) return;
  panes.value.push({
    title: to.meta?.title,
    content: 'Content of Tab',
    key: to.path
  });
});

// const remove = (targetKey: string) => {
//   let lastIndex = 0
//   panes.value.forEach((pane, i) => {
//     if (pane.key === targetKey) {
//       lastIndex = i - 1
//     }
//   })
//   panes.value = panes.value.filter(pane => pane.key !== targetKey)
//   if (panes.value.length && activeKey.value === targetKey) {
//     if (lastIndex >= 0) {
//       activeKey.value = panes.value[lastIndex].key
//     } else {
//       activeKey.value = panes.value[0].key
//     }
//   }
//   void router.push(activeKey.value)
// }

// const onEdit = (targetKey: string | MouseEvent, action: string) => {
//   if (action === 'remove') {
//     remove(targetKey as string)
//   }
// }

// const onChange = (targetKey: string | MouseEvent) => {
//   void router.push(targetKey as RouteLocationRaw)
// }
</script>

<template>
  <div class="tab-view">
  </div>
</template>

<style scoped>
.tab-view {
  background-color: #fff;
  padding-top: 6px;
}
</style>
