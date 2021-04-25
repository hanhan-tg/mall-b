<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[$router.currentRoute.matched[1] ?
      $router.currentRoute.matched[1].name : '']"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <a-sub-menu v-for="route in $store.state.menuRoutes" :key="route.name">
        <span slot="title">
          <a-icon type="mail" /><span>{{ route.meta.title }}</span></span>
        <a-menu-item v-for="child in route.children" :key="child.name">
          <router-link :to="{name: child.name}">{{ child.meta.title }}</router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
export default {
};
</script>

<style>
</style>
