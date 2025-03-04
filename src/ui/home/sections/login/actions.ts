import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useAuthAStore from "../../../../store/auth";
import { loginSchema } from "./schema";

const useLogin = () => {
  const { login, loading, reset } = useAuthAStore();
  const { push } = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      business_email: "",
      password: "",
    },
  });

  const onSubmit = async (payload: any) => {
    const res: any = await login(payload);
    if (!res?.user) return;
    const status = res.user.status;
    if (res.user.role === "admin") {
      push("/admin/userapproval");
    } else {
      if (status === "pending" || status === "onHold") {
        push(`/?status=${status}&login=false`);
      } else if (status === "active") {
        push("https://florist.wpro.ai/dashboard/events");
      } else {
        push("/");
      }
    }
    setTimeout(() => {
      form.reset();
    }, 800);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return {
    onSubmit,
    form,
    showPassword,
    setShowPassword,
    loading,
  };
};

export default useLogin;
