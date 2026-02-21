import * as yup from "yup";
import {useFormik} from "formik";
import style from "./style.module.scss"
import {Button, TextField } from "@mui/material";

const validationSchema = yup.object({
    username: yup
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
    phone:yup
    .string()
    .min(9, "Too short!")
    .max(14, "Too long!")
        .required("This field is required"),
})

const RegistrationForm = () =>{
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            phone: "",
        },
        validationSchema,

 onSubmit: async () => {}})
return (<div className={style.registrationForm}>
    <form className={style.form} onSubmit={formik.handleSubmit}>
        <TextField
            name={"username"}
            label="Username"
            placeholder="Username"
            onChange={formik.handleChange}

        />
        <TextField
            name={"email"}
            label="Email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
        />
        <TextField
            name={"password"}
            type="password"
            label="Password"
            placeholder="Password"
            onChange={formik.handleChange}

        />
        <TextField
            name={"phone"}
            type="phone"
            label="phone"
            placeholder="phone"
            onChange={formik.handleChange}

        />
        <Button type="submit">Submit</Button>
    </form>
</div>)
}
export default RegistrationForm