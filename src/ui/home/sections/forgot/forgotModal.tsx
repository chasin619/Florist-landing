"use client";

import React from "react";

import { CustomDialog } from "@/components/common/dialog";
import { Button } from "../../../../components/common/button";
import { Input } from "../../../../components/common/input";
import useForgot from "./actions";

interface ForgotModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ForgotModal: React.FC<ForgotModalProps> = ({ isOpen, onOpenChange }) => {
  const { onSubmit, form, loading } = useForgot();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  return (
    <CustomDialog title="Forgot" isOpen={isOpen} onOpenChange={onOpenChange}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("business_email")}
          placeholder="Email"
          name="business_email"
          type="email"
          error={errors}
          autoFocus
        />
        <Button
          title="Send Email"
          customStyles="w-full py-[8px] !mt-4"
          type="submit"
          disabled={loading}
        />
      </form>
    </CustomDialog>
  );
};

export default ForgotModal;
