"use client";

import React from "react";
import { Flex, Text } from "@radix-ui/themes";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";
import useResetForm from "./actions";

const ResetForm = () => {
  const {
    form,
    onSubmit,
    loading,
    token,
    FEILDS,
    showPassword,
    setShowPassword,
  } = useResetForm();
  const {
    handleSubmit,
    register,
    formState: { errors },
  }: { handleSubmit: any; register: any; formState: { errors: any } } = form;

  if (!token) {
    return (
      <Flex
        align="center"
        justify="center"
        direction="column"
        gap="4"
        width="100%"
        height="100vh"
      >
        <Text as="p" color="gray" mb="5" size="3" align="center">
          Your new password must be different to previously used passwords.
        </Text>
      </Flex>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center"
    >
      <Flex
        align="center"
        justify="center"
        direction="column"
        gap="4"
        maxWidth="400px"
      >
        <Text
          as="p"
          className="text-primaryGray !tracking-[.4px] md:text-3xl xs:text-3xl mt-48"
        >
          Reset Password
        </Text>
        <Text as="p" color="gray" mb="5" size="3" align="center">
          Your new password must be different to previously used passwords.
        </Text>
        {FEILDS.map((field) => (
          <div key={field.name} className="w-full relative">
            <Input
              {...register(field.name as "password" | "confirm_password")}
              type={showPassword[field.name] ? "text" : "password"}
              placeholder={field.placeholder}
              error={errors}
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev: any) => ({
                  ...prev,
                  [field.name]: !showPassword[field.name],
                }))
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword[field.name] ? (
                <EyeOpenIcon className="w-4 h-4" />
              ) : (
                <EyeClosedIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        ))}
        <Button
          title="Reset Password"
          customStyles="w-full py-[8px] !mt-4"
          type="submit"
          disabled={loading}
        />
      </Flex>
    </form>
  );
};

export default ResetForm;
