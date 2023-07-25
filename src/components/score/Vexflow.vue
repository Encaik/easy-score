<template>
  <div id="score"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "@/stores/score";
import { storeToRefs } from "pinia";
import Vex from "vexflow";

const store = useStore();
let { toneJson } = storeToRefs(store);
let vf = null;

onMounted(() => {
  vf = new Vex.Flow.Factory({
    renderer: { elementId: "score", width: 800, height: 800 },
  });
  store.$subscribe((state) => {
    onScoreUpdate(state.payload.toneJson);
  });
});

function onScoreUpdate(toneJson) {
  let score = vf.EasyScore();
  toneJson.tracks.forEach((track, trackIdx) => {
    let system = vf.System();
    let notes = track.notes.map((note) => note.name);
    let x = 0;
    let y = trackIdx * 80;
    const MAX_WIDTH = 800;
    while (notes.length) {
      const noteSlice = notes.splice(0, 4);
      while (noteSlice.length !== 4) {
        noteSlice.push("C4/r");
      }
      noteSlice[0] += "/q";
      const noteStr = noteSlice.join(",");
      if (x + 200 > MAX_WIDTH) {
        x = 0;
        y += 160;
      }
      system = vf.System({ x: x, y: y, width: 200, spaceBetweenStaves: 10 });
      system.addStave({
        voices: [score.voice(score.notes(noteStr))],
      });
      x += 200;
    }
  });

  vf.draw();
}
</script>
