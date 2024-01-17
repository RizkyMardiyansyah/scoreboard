// stores/stopwatchStore.js
import create from "zustand";

const useStopwatchStore = create((set) => ({
  elapsedTime: 0,
  isRunning: false,
  startStopwatch: () => set({ isRunning: true }),
  stopStopwatch: () => set({ isRunning: false }),
  resetStopwatch: () => set({ elapsedTime: 0, isRunning: false }),
  updateElapsedTime: () =>
    set((state) => ({ elapsedTime: state.elapsedTime + 100 })),
}));

export default useStopwatchStore;
