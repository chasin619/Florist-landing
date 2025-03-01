import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  business_email: Yup.string()
    .email("Email Address must be a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
