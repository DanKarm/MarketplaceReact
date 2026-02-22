import * as yup from "yup";
import {useFormik} from "formik";
import style from "./style.module.scss"
import {Button, TextField } from "@mui/material";
import {useRegistrationMutation} from "../api/userApi.ts";

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
    const [registration] = useRegistrationMutation();//тут ругаеться на error

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            phone: "",
        },
        validationSchema,

 onSubmit: async (values) => {
            try{
                const newUser = await registration(values).unwrap()
                console.log(newUser)
            } catch (error) {console.log(error)}
 }})
return (<div className={style.registrationForm}>
    <form className={style.form} onSubmit={formik.handleSubmit}>
        <TextField
            name={"username"}
            label="Username"
            placeholder="Username"
            onChange={formik.handleChange}
            value={formik.values.username}
            error={Boolean(formik.touched.username && formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
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
</div>)
}
export default RegistrationForm