import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "react-toastify";

import { zustandStorage } from "./storage/storage";
import axios from "axios";

const initialState = {
  blogs: null,
};

const useBlogStore = create<BlogStoreState>()(
  persist(
    (set) => ({
      ...initialState,
      getAllBlogs: async () => {
        try {
          const response = await axios.get("https://admin.wpro.ai/api/blog", {
            headers: {
              "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ZjI3MjVkZTFkY2M1ZmQ5ZjMyOTM2In0sImlhdCI6MTczNjQwMzk0OSwiZXhwIjoxNzM2NDA3NTQ5fQ.n3qwzt8ljnRGVgWV33MiCdn2uA8nLM_BJ3CnqTgDl9U`,
            }
          });
          console.log(response.data)
          set({ blogs: response.data.blogs });
        } catch (error: any) {
          toast.error(error.response.data.message);
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

export default useBlogStore;
