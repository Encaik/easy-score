<template>
  <div class="h-full flex flex-row">
    <div class="flex-1">
      <Midi></Midi>
    </div>
    <div class="divider lg:divider-horizontal"></div>
    <div class="w-fit">
      <Vexflow></Vexflow>
    </div>
  </div>
</template>

<script setup lang="ts">
import Midi from "@/components/input/Midi.vue";
import Vexflow from "@/components/score/Vexflow.vue";
</script>

<style scoped></style>
