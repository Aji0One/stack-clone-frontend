import React from "react";
import { TextField, Button, Box } from "@mui/material";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Signup() {
   
    const navigate= useNavigate();

    const validateForm = (formData) => {
        var errors = {}
        if (formData.userName === '') errors.userName = 'Name is Required';
        if (formData.email === '') errors.email = 'Email is Required';
        if (formData.password === '') errors.password = 'Password is Required';
        if (formData.confirmPassword === '') errors.confirmPassword = 'Confirm Password is Required';
        if(formData.password !== formData.confirmPassword) errors.confirmPassword="Password doen't match";
        return errors;
    }

    // const validatePassword = values => {
    //     let error = "";
    //     const passwordRegex = /(?=.*[0-9])/;
    //     if (!values) {
    //       error = "*Required";
    //     } else if (values.length < 8) {
    //       error = "*Password must be 8 characters long.";
    //     } else if (!passwordRegex.test(values)) {
    //       error = "*Invalid password. Must contain one number.";
    //     }
    //     return error;
    //   };

    // const validateConfirmPassword = (pass, value) => {

    //     let error = "";
    //     if (pass && value) {
    //       if (pass !== value) {
    //         error = "Password not matched";
    //       }
    //     }
    //     return error;
    //   };

    const handleSubmit = async (formData, { resetForm }) => {
        
        //console.log(formData);
        
        const response= await axios.post("https://webcode-stackclone.herokuapp.com/register/signup",{...formData});
        if(response.data){
           localStorage.setItem("token",response.data);
            console.log(response);
            navigate("/stack");

        }

        resetForm();
       
    };

    return (
               
                    <Formik initialValues={{
                        userName: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
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
                                    label="Username"
                                    variant="standard"
                                    type="text"
                                    name="userName"
                                    value={values.userName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                ></TextField>
                                <br />
                                <span style={{ color: 'red' }}>{touched.userName && errors.userName}</span>
                                <br />
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
                                    variant="standard"
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <br />
                                <span style={{ color: 'red' }}>{touched.password && errors.password}</span>
                                <br />
                            <TextField id="standard-basic"
                                label="Confirm Password"
                                variant="standard"
                                type="password"
                                name="confirmPassword"
                                value={values.confirmPassword} 
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        <br />
                        <span style={{color:'red'}}>{touched.confirmPassword && errors.confirmPassword}</span>
                        <br/>
                                <Button variant="contained" type="submit" >Register</Button>
                            </Box>)}
                    </Formik>



               
          

    )
}

export default Signup;