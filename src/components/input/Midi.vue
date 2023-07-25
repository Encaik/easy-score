<template>
  <div class="flex flex-col m-5">
    <div>
      <p class="font-sans text-xl font-medium text-slate-900">上传MIDI文件</p>
      <input
        type="file"
        class="file-input file-input-bordered file-input-primary w-full max-w-xs"
        name="上传midi文件"
        @change="onMidiUpload"
      />
    </div>
    <div class="mt-2">
      <button class="btn btn-primary" @click="onPlayClick">播放</button>
      <button class="btn btn-primary ml-2" @click="onStopClick">停止</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Midi } from "@tonejs/midi";
import * as Tone from "tone";
import { useStore } from "@/stores/score";

const store = useStore();
let { toneJson } = store;
let synths: Tone.PolySynth<Tone.Synth>[] = [];

function onMidiUpload(event: any) {
  const file = event.target.files[0];
  let reader = new FileReader();
  reader.onload = () => {
    const midi = new Midi(reader.result as ArrayBuffer);
    store.$patch({
      toneJson: midi,
    });
  };
  reader.readAsArrayBuffer(file);
}

function onPlayClick() {
  toneJson.tracks.forEach((track) => {
    const now = Tone.now() + 0.5;
    const synth = new Tone.PolySynth(Tone.Synth, {
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
      },
    }).toDestination();
    synths.push(synth);
    track.notes.forEach((note) => {
      synth.triggerAttackRelease(
        note.name,
        note.duration,
        note.time + now,
        note.velocity
      );
    });
  });
}

function onStopClick() {
  synths.forEach((synth) => {
    synth.disconnect();
  });
  synths = [];
}
</script>

<style scoped></style>
