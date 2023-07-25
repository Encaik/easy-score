<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Easy Score</h1>
        <p class="py-6">
          通过上传midi文件或编写abc格式文本，
          将乐谱渲染出来，并可以根据乐器切换不同的显示形式，
          如果有可能还会添加自动演奏及主动演奏模式。
        </p>
        <button class="btn btn-primary" @click="onStartClick">上传Midi</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "../router";

function onStartClick() {
  router.push("/home");
}
</script>

<style scoped></style>
