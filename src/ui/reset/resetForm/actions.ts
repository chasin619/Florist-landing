import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

// import { yupResolver } from "@hookform/resolvers/yup";
// import useAuthAStore from "@/store/auth";
import { resetSchema } from "./schema";

const useResetForm = () => {
  // const { loading, resetPassword } = useAuthAStore();
  const { push } = useRouter();
  const loading = false; // termporary
  const token = useSearchParams()?.get("token");
  const [showPassword, setShowPassword] = useState<any>({
    password: false,
    confirmPassword: false,
  });

  const form = useForm({
    // resolver: yupResolver(resetSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (payload: any) => {
    // await resetPassword({ ...payload, token });
    form.reset();
    push("/?login=true");
  };

  const FEILDS = [
    {
      name: "password",
      placeholder: "Enter your new password",
    },
    {
      name: "confirm_password",
      placeholder: "Enter your confirm Password",
    },
  ];

  return {
    onSubmit,
    form,
    showPassword,
    setShowPassword,
    loading,
    token,
    FEILDS,
  };
};

export default useResetForm;
