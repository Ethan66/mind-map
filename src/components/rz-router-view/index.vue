<!--  -->
<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component :is="Component" :key="route.name" v-if="!route.meta.noCache" />
    </keep-alive>
    <component :is="Component" :key="route.name" v-if="route.meta.noCache" />
  </router-view>
</template>

<script lang="ts" setup></script>
<style lang="stylus" scoped></style>
