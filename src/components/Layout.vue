<template>
  <div class="h-full flex flex-col">
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl">EasyScore</a>
      </div>
    </div>
    <div class="flex-auto">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
