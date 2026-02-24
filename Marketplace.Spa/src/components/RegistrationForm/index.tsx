import * as yup from "yup";
import { useFormik } from "formik";
import style from "./style.module.scss";
import { Button, TextField } from "@mui/material";

import { registration } from "../../api/userApi.ts";

const validationSchema = yup.object({
    firstName: yup
    .string()
    .min(3, "Must be longer than 3")
    .max(15, "One step too many")
    .required("This field is required"),
    lastName: yup
        .string()
        .min(3, "Must be longer than 3")
        .max(15, "One step too many")
        .required("This field is required"),
  email: yup.string().email("Invalid email").required("This field is required"),
  password: yup
    .string()
    .min(5, "Too short!")
    .max(15, "Too long!")
    .required("This field is required"),
  phone: yup
    .string()
    .min(9, "Too short!")
    .max(14, "Too long!")
    .required("This field is required"),
});

const RegistrationForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
        lastName:"",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      registration(values);
    },
  });
  return (
    <div className={style.registrationForm}>
      <form className={style.form} onSubmit={formik.handleSubmit}>
        <TextField
          name={"firstName"}
          label="firstName"
          placeholder="firstName"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          error={Boolean(formik.touched.firstName && formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
          <TextField
          name={"lastName"}
          label="lastName"
          placeholder="lastName"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          error={Boolean(formik.touched.lastName && formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          name={"email"}
          label="Email"
          type="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          name={"password"}
          type="password"
          label="Password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          name={"phone"}
          type="phone"
          label="phone"
          placeholder="phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={Boolean(formik.touched.phone && formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
export default RegistrationForm;
