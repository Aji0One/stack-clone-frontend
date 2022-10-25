import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Formik } from "formik";
import Signup from "./Signup";
import "./index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Index() {
    const [register, setRegister] = useState(true);
    const navigate = useNavigate();

    const validateForm = (formData) => {
        var errors = {}
        if (formData.email === '') errors.email = 'Email is Required';
        if (formData.password === '') errors.password = 'Password is Required';

        return errors;
    }


    const handleSubmit = async (formData, { resetForm }) => {
        delete (formData.userName);

        //console.log(formData);

        const response = await axios.post("http://localhost:3001/register/signin", { ...formData });
        if (response.data) {
            localStorage.setItem("token", response.data);
            //console.log(response);
            navigate("/stack");
        }
        resetForm();

    };
    return (
        <div className="auth">
            <div className="row">
                <div className="container col-md-5">
                    <div className="auth-login" >
                        <Typography variant="h4" >Welcome Back!!!</Typography>
                        <div className="auth-container">
                            {register ? (<>
                                <Formik initialValues={{
                                    userName: "",
                                    email: "",
                                    password: "",
                                    //confirmPassword: ""
                                }} validate={(formData) => validateForm(formData)}
                                    onSubmit={handleSubmit}>

                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,

                                    }) => (

                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 1, width: '25ch' },
                                            }}

                                            autoComplete="off"
                                            onSubmit={handleSubmit}


                                        >
                                            <TextField id="standard-basic"
                                                label="Email"
                                                variant="standard"
                                                type="email"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            ></TextField>
                                            <br />
                                            <span style={{ color: 'red' }}>{touched.email && errors.email}</span>
                                            <br />
                                            <TextField id="standard-basic"
                                                label="Password"
                                                name="password"
                                                variant="standard"
                                                type="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <br />
                                            <span style={{ color: 'red' }}>{touched.password && errors.password}</span>
                                            <br />
                                            <Button variant="contained" type="submit">Signin</Button>
                                        </Box>)}
                                </Formik>

                            </>) : (<Signup />)}


                            <Button size="small" onClick={() => setRegister(!register)}>{register ? "Register" : "Login"} ?</Button>
                        </div>
                    </div>
                </div>
                <div className="container col-md-7 pic">
                    <img src="https://media.istockphoto.com/vectors/little-girl-reading-with-stacks-of-books-vector-id166081761" alt="pic" />
                </div>
            </div>
        </div>

    )
}

export default Index;