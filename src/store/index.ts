import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


type Store = {
  isUnlockAll:  boolean;
  checkBoxes: any | null;
  setIsUnlockAll: (isUnlock: boolean) => void;
  setCheckBoxes: (checkBoxes: any | null) => void;
};

const useStore = create(
  persist<Store>(
    (set, get) => ({
      isUnlockAll: false,
      checkBoxes: null,
      setIsUnlockAll: (isUnlockAll) => set((state) => ({ ...state, isUnlockAll: isUnlockAll})),
      setCheckBoxes: (checkBoxes) => set((state) => ({ ...state, checkBoxes: checkBoxes})),
    }),
    {
      name: "store", // Set a name for your persisted store
      //storage: createJSONStorage(()=> sessionStorage) // (optional) by default, 'localStorage' is used
    }
  )
);

export default useStore;
