import { h } from 'vue';
import type { Component } from 'vue';
import { NIcon } from 'naive-ui';

/**
 * render 图标
 * */
export function renderIcon(icon: Component | undefined) {
  if (icon === undefined) return;
  return () => h(NIcon, null, { default: () => h(icon) });
}
