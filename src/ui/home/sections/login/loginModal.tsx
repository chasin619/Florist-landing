"use client";

import React from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";

import { CustomDialog } from "@/components/common/dialog";
import { Button } from "../../../../components/common/button";
import { Input } from "../../../../components/common/input";
import useLogin from "./actions";

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onForgotClick: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onOpenChange, onForgotClick }) => {
  const { onSubmit, form, showPassword, setShowPassword, loading } = useLogin();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  return (
    <CustomDialog title="Login" isOpen={isOpen} onOpenChange={onOpenChange}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("business_email")}
          placeholder="Email"
          name="business_email"
          type="email"
          error={errors}
          autoFocus
        />
        <div className="relative">
          <Input
            {...register("password")}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            error={errors}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOpenIcon className="w-4 h-4" />
            ) : (
              <EyeClosedIcon className="w-4 h-4" />
            )}
          </button>
        </div>
        <Text
          as="p"
          size="2"
          weight="light"
          align="right"
          className="text-primaryGray underline cursor-pointer"
          onClick={onForgotClick}
        >
          Forgot password?
        </Text>

        <Button
          title="Login"
          customStyles="w-full  py-[8px] !mt-4"
          type="submit"
          disabled={loading}
        />
      </form>
    </CustomDialog>
  );
};

export default LoginModal;
