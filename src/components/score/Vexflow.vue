<template>
  <div id="score"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "@/stores/score";
import Vex, { Formatter, StaveNote } from "vexflow";
import { Midi } from "@tonejs/midi";
const { Renderer, Stave } = Vex.Flow;

const store = useStore();
let context: any = null;
let renderer: any = null;
let rendererHeight = 800;
const durationTicksMap: { [key: number]: string } = {
  1440: "wd",
  1200: "qr",
  960: "w",
  720: "hd",
  480: "h",
  360: "qd",
  240: "q",
  180: "8d",
  120: "8",
  90: "16d",
  60: "16",
};

onMounted(() => {
  const div = document.getElementById("score") as HTMLDivElement;
  renderer = new Renderer(div!, Renderer.Backends.SVG);
  renderer.resize(800, rendererHeight);
  context = renderer.getContext();
  store.$subscribe((state: any) => {
    onScoreUpdate(state.payload.toneJson);
  });
});

function onScoreUpdate(toneJson: Midi) {
  toneJson.tracks.forEach((track, trackIdx) => {
    let paddingX = 25;
    let paddingY = 25 + trackIdx * 80;
    const LINE_HEIGHT = 80 * toneJson.tracks.length;
    const LINE_WIDTH = 150;
    let drawNotes = [];
    let drawNotesTicks = 0;
    let rowIdx = 0;
    let staveIdx = 0;
    for (let index = 0; index < track.notes.length; index++) {
      const note = track.notes[index];
      drawNotes.push(note);
      drawNotesTicks += note.durationTicks;
      if (drawNotes.length === 4) {
        let posX = paddingX + staveIdx * LINE_WIDTH;
        if (posX >= 750) {
          staveIdx = 0;
          rowIdx++;
          posX = paddingX + staveIdx * LINE_WIDTH;
        }
        const posY = paddingY + rowIdx * LINE_HEIGHT;
        const stave = new Stave(posX, posY, LINE_WIDTH);
        if (staveIdx === 0 && rowIdx === 0) {
          stave.addClef("treble").addTimeSignature("4/4");
        }
        drawNotes = drawNotes.map((note) => {
          return new StaveNote({
            keys: [`${note.pitch}/${note.octave}`],
            duration: durationTicksMap[note.durationTicks],
          });
        });
        staveIdx++;
        stave.setContext(context).draw();
        Formatter.FormatAndDraw(context, stave, drawNotes);
        const newRendererHeight = posY + LINE_HEIGHT + paddingX;
        if (newRendererHeight > rendererHeight) {
          rendererHeight = newRendererHeight;
          renderer.resize(800, rendererHeight);
        }
        drawNotes = [];
        drawNotesTicks = 0;
      }
    }
  });
}
</script>
