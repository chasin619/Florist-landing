import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import apiInstance from "../utils/api";
import { zustandStorage } from "./storage/storage";

const initialState = {
  loading: false,
};

const useAuthAStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      ...initialState,
      login: async (payload) => {
        set({ loading: true });
        try {
          const response = await apiInstance.post("/user/login", payload);
          const { token, user } = response.data;

          if (user.status === "pending" || user.status === "onHold") {
            return response.data;
          }

          Cookies.set("authToken", token, {
            expires: 7,
            secure: true,
            sameSite: "None",
            domain: ".wpro.ai",
          });

          toast.success("Login successful!");
          return response.data;
        } catch (error: any) {
          if (error.response) {
            toast.error(error.response.data.message || "Login failed!");
          } else {
            toast.error("An unexpected error occurred!");
          }
        } finally {
          set({ loading: false });
        }
      },
      forgotPassword: async (payload) => {
        set({ loading: true });
        try {
          const response = await apiInstance.post(
            "/user/forgot-password",
            payload
          );
          toast.success(
            response.data.message || "Password reset link sent to your mail!"
          );
        } catch (error: any) {
          toast.error(
            error.response.data.message || "Failed to send reset link!"
          );
        } finally {
          set({ loading: false });
        }
      },
      resetPassword: async (payload) => {
        set({ loading: true });
        try {
          const response = await apiInstance.post(
            "/user/reset-password",
            payload
          );
          toast.success(response.data.message);
        } catch (error: any) {
          // toast.error(
          //   error.response.data.message || "Failed to reset password!"
          // );
        } finally {
          set({ loading: false });
        }
      },
      reset: () => set(initialState),
    }),
    {
      name: "home-store",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useAuthAStore;
