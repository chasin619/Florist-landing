import * as Yup from "yup";

export const forgotSchema = Yup.object().shape({
  business_email: Yup.string()
    .email("Email Address must be a valid email")
    .required("Email is required"),
});
