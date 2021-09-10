<template>
  <q-breadcrumbs>
    <q-breadcrumbs-el
      v-for="item in $route.matched.slice(1)"
      :key="item.path"
      :label="item.meta.title"
      :to="item.path"
    >
    </q-breadcrumbs-el>
  </q-breadcrumbs>

</template>
