import * as yup from "yup";
import { useFormik } from "formik";
import style from "./style.module.scss";
import {Alert, Button, TextField, Typography } from "@mui/material";
import type { ILoginUser } from "../../entity/IUser";

import { useLoginMutation } from "../../api/userApiBQ";
import {appRoutes} from "../../routes.ts";
import {useNavigate} from "react-router";
import {useState} from "react";

const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("This field is required"),
    password: yup
        .string()
        .min(3, "Too short!")
        .max(15, "Too long!")
        .required("This field is required"),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [login] = useLoginMutation();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema,

        onSubmit: async (values: ILoginUser) => {
            try {
                await login(values).unwrap();
                navigate(appRoutes.products())
            } catch (error) {
                setError("Login or password is incorrect: "+error);
            }
        },
    });

    return (
        <>
            {error && <Alert severity="error">{error}</Alert>}
        <div className={style.registrationForm}>
            <Typography variant={"h3"} width={300} textAlign={"center"} sx={{margin:"auto"}}>Login</Typography>
            <form className={style.form} onSubmit={formik.handleSubmit}>
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                    name="password"
                    type="password"
                    label="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={Boolean(formik.touched.password && formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <Button type="submit">Submit</Button>
            </form>
        </div>
        </>
    );
};

export default LoginForm;