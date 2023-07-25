import { Midi } from '@tonejs/midi'
import { defineStore } from 'pinia'

export const useStore = defineStore('score', {
  state: () => {
    return {
      toneJson: {} as Midi,
    }
  },
})