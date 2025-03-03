import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "react-toastify";

import apiInstance from "@/utils/api";
import { zustandStorage } from "./storage/storage";

const initialState = {
  user: null,
};

const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      ...initialState,
      getProfile: async () => {
        try {
          const response = await apiInstance.get("/user/profile");
          set({ user: response.data });
          toast.success(response.data.message);
        } catch (error: any) {
          // toast.error(error.response.data.message);
        }
      },
      reset: () => set(initialState),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useUserStore;
