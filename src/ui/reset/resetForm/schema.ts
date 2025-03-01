import * as Yup from "yup";

export const resetSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .min(6, "Password must be at least 6 characters")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
