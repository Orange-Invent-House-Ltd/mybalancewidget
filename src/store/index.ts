import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


type Store = {
  isUnlockAll:  boolean;
  checkBoxes: any | null;
  count:any;
  userID:any;
  key:string;
  setIsUnlockAll: (isUnlock: boolean) => void;
  setCheckBoxes: (checkBoxes: any | null) => void;
  setCount: (count: any) => void;
  setUserID: (userID: any) => void;
  setKey: (key: string) => void;
};

const useStore = create(
  persist<Store>(
    (set, get) => ({
      isUnlockAll: false,
      checkBoxes: null,
      count:0,
      userID: null,
      key: '',
      setIsUnlockAll: (isUnlockAll) => set((state) => ({ ...state, isUnlockAll: isUnlockAll})),
      setCheckBoxes: (checkBoxes) => set((state) => ({ ...state, checkBoxes: checkBoxes})),
      setCount: (count) => set((state) => ({ ...state, count: count})),
      setUserID: (userID) => set((state) => ({ ...state, userID: userID})),
      setKey: (key) => set((state) => ({ ...state, key: key})),
    }),
    {
      name: "store", // Set a name for your persisted store
      //storage: createJSONStorage(()=> sessionStorage) // (optional) by default, 'localStorage' is used
    }
  )
);

export default useStore;
