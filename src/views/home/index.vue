<script lang="ts" setup>
const projects = ref([
  {
    name: 'vue3-admin-template',

    link: '/views/projects/001',
  },
  {
    name: 'vue3-admin-template',
    link: '/views/projects/002',
  },
  {
    name: 'vue3-admin-template',
    link: '/views/projects/003',
  },
  {
    name: 'vue3-admin-template',
    link: '/views/projects/004',
  },
  {
    name: 'vue3-admin-template',
    link: '/views/projects/005',
  },

])
</script>

<template>
  <div id="home" class="mx-auto max-w-[800px] m-t-[40px]">
    <div class="title color-[#333]  text-xl font-bold">
      Projects
    </div>
    <div class="projects color-[#666]  grid gap-y-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 p-t-5">
      <template v-for="(item) in projects" :key="item.link">
        <router-link :to="item.link" class="mr-4 link">
          {{ item.name }}
        </router-link>
      </template>
    </div>
    <footer class="footer m-t-5 color-[#666]">
      from 2024/10/27
    </footer>
  </div>
</template>
