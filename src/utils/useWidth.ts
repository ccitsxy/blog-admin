import { onMounted, onUnmounted, ref } from 'vue';

function useWidth() {
  const width = ref(0);

  function onResize() {
    width.value = window.innerWidth;
  }

  onMounted(() => {
    window.addEventListener('resize', onResize);
    onResize();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });

  return {
    width,
  };
}

export default useWidth;
