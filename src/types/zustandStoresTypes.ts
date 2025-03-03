declare global {
  type AuthStoreState = {
    loading: boolean;
    login: (payload: any) => Promise<void>;
    forgotPassword: (payload: any) => Promise<void>;
    resetPassword: (payload: any) => Promise<void>;
    reset: () => void;
  };
  type UserStoreState = {
    user: any;
    getProfile: () => Promise<void>;
    reset: () => void;
  };
  type BlogStoreState = {
    blogs: any;
    getAllBlogs: () => Promise<void>;
    reset: () => void;
  };
}
export {};
