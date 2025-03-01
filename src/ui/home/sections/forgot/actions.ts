import { useState } from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

// import useAuthAStore from "@/store/auth";
import { forgotSchema } from "./schema";

const useForgot = () => {
  // const { loading, forgotPassword } = useAuthAStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm({
    // resolver: yupResolver(forgotSchema),
    defaultValues: {
      business_email: "",
    },
  });

  const onSubmit = async (payload: any) => {
    // await forgotPassword(payload);
    form.reset();
  };

  return {
    onSubmit,
    form,
    showPassword,
    setShowPassword,
    // loading,
  };
};

export default useForgot;
