import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import "./AdminRegister.css"

const validateFormSchema = yup.object({
    firstname: yup.string().required('Please fill the First Name'),
    lastname: yup.string().required('Please fill the Last Name'),
    adminname: yup.string().required('Please fill the Username'),
    email: yup.string().min(5,"need a longer email address").required('plz fill email address').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "pattern not matched"),
    password: yup.string().min(5, "need a longer password").max(12, "too much password").required("fill password!!")
})

const AdminRegister = () => {

    const history = useHistory()

    const {handleBlur, handleChange, handleSubmit, errors, values, touched} = useFormik(
        {
            initialValues:{firstname:"",lastname:"",adminname:"",email:"",password:"",role:"admin"},
            validationSchema: validateFormSchema,
            onSubmit: (values) => {
                registerAdmin(values)
            }
        }
    )

    const registerAdmin = (values) => {
        console.log(values)
        fetch('https://pizza-api-task.herokuapp.com/pizzas/auth/admin/signup', {
        method:'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(values)
    }).then(()=> history.push('/admin-login'))
    }

    return (
        <section>
            <article className="container register-wrapper">
              <Card className="form-card">
                <CardContent className="form-cardContent">
                  <h3>Create an Admin Account</h3>
                <form className="form-wrapper" onSubmit={handleSubmit}>
                  <div className="form-control">
                    <TextField className="userInput" label='First Name' placeholder='Enter First Name' id="firstname" name="firstname" value={values.firstname} error={errors.firstname && touched.firstname} helperText={errors.firstname && touched.firstname && errors.firstname} onChange={handleChange} onBlur={handleBlur}  multiline variant="standard" />
                  </div>
                  <div className="form-control">
                    <TextField className="userInput" label='Last Name' placeholder='Enter Last Name' id="lastname" name="lastname" value={values.lastname} error={errors.lastname && touched.lastname} helperText={errors.lastname && touched.lastname && errors.lastname} onChange={handleChange} onBlur={handleBlur} multiline variant="standard" />
                  </div>
                  <div className="form-control">
                    <TextField className="userInput" label='Adminname' placeholder='Enter Adminname' id="adminname" name="adminname" value={values.adminname} error={errors.adminname && touched.adminname} helperText={errors.adminname && touched.adminname && errors.adminname} onChange={handleChange} onBlur={handleBlur} multiline variant="standard" />
                  </div>
                  <div className="form-control">
                    <TextField className="userInput" label='Email Address' placeholder='Enter Email Address' id="email" name="email" value={values.email} error={errors.email && touched.email} helperText={errors.email && touched.email && errors.email} onChange={handleChange} onBlur={handleBlur} multiline variant="standard" />
                  </div>
                  <div className="form-control">
                    <TextField className="userInput" label='Password' placeholder='Enter Password' id="password" name="password" value={values.password} error={errors.password && touched.password} helperText={errors.password && touched.password && errors.password} onChange={handleChange} onBlur={handleBlur} multiline variant="standard" />
                  </div>
                  <div className="form-control">
                    <TextField
                      className="userInput"
                      disabled
                      id="role"
                      name="role"
                      value={values.role}
                      label="Role (Default)"
                      variant="standard"
                    />
                  </div>
                  <Button className="submitBtn" variant="contained" size="medium"  type="submit">Create Admin</Button>
                </form>
                </CardContent>
                </Card>
            </article>
        </section>
    )
}

export default AdminRegister
