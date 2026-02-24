import * as yup from "yup";
import { useFormik } from "formik";
import style from "./style.module.scss";
import { Button, TextField } from "@mui/material";
import type {ILoginUser} from "../../entity/IUser.ts";
import {login} from "../../api/userApi.ts";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("This field is required"),
  password: yup
    .string()
    .min(5, "Too short!")
    .max(15, "Too long!")
    .required("This field is required"),
});

const LoginnForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,

    onSubmit: async (values:ILoginUser) => {
        const token = login(values);
        console.log(token);
    },
  });
  return (
    <div className={style.registrationForm}>
      <form className={style.form} onSubmit={formik.handleSubmit}>
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
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
export default LoginnForm;
