import React from 'react'
import "./CustomPizza.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik'
import * as yup from 'yup';
import { FormHelperText } from '@mui/material';

const validateFormSchema = yup.object({
    base: yup.string().required('Please choose the Pizza Base'),
    sauce: yup.string().required('Please choose the Sauce type'),
    cheese: yup.string().required('Please choose the Cheese type'),
})

const CustomPizza = () => {
    const {handleBlur, handleChange, handleSubmit, errors, values, touched} = useFormik(
        {
            initialValues:{base:"Pizza Bagels",sauce:"Pesto",cheese:"Mozzarella"},
            validationSchema: validateFormSchema,
            onSubmit: (values) => {
                addProduct(values)
            }
        }
    )

    const addProduct = (values) => {
        console.log(values)
    }

    return (
        <section className="container custom-pizza-wrapper">
            <div className="custom-image">
                <img src="https://www.pngall.com/wp-content/uploads/4/Pepperoni-Dominos-Pizza-PNG-Free-Download.png" alt="customPizza"></img>
            </div>
            <article className="custom-pizza-form">
                <Card className="form-card">
                    <CardContent className="form-cardContent">
                        <form className="form-wrapper" onSubmit={handleSubmit}>
                            <div className="form-control pizza-form-div">
                                <InputLabel id="demo-simple-select-standard-label" className="userInput">Choose Pizza Base</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="base"
                                    name="base"
                                    label="Pizza Base"
                                    value={values.base}
                                    onChange={handleChange}
                                    error={errors.base && touched.base}
                                    onBlur={handleBlur}
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"Pizza Bagels"}>Pizza Bagels</MenuItem>
                                    <MenuItem value={"Cheese-Stuffed Crus"}>Cheese-Stuffed Crust</MenuItem>
                                    <MenuItem value={"Flatbread"}>Flatbread</MenuItem>
                                    <MenuItem value={"Thin Crust"}>Thin Crust</MenuItem>
                                    <MenuItem value={"New York Style"}>New York Style</MenuItem>
                                </Select>
                                <FormHelperText>{errors.base && touched.base && errors.base}</FormHelperText>
                            </div>

                            <div className="form-control pizza-form-div">
                                <InputLabel id="demo-simple-select-standard-label" className="userInput">Choose Sauce</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="sauce"
                                    name="sauce"
                                    label="Sauce"
                                    value={values.sauce}
                                    onChange={handleChange}
                                    error={errors.sauce && touched.sauce}
                                    onBlur={handleBlur}
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"Pesto"}>Pesto</MenuItem>
                                    <MenuItem value={"White Garlic Sauce"}>White Garlic Sauce</MenuItem>
                                    <MenuItem value={"Garlic Ranch Sauce"}>Garlic Ranch Sauce</MenuItem>
                                    <MenuItem value={"Hummus"}>Hummus</MenuItem>
                                    <MenuItem value={"Buffalo Sauce"}>Buffalo Sauce</MenuItem>
                                </Select>
                                <FormHelperText>{errors.sauce && touched.sauce && errors.sauce}</FormHelperText>
                            </div>

                            <div className="form-control pizza-form-div">
                                <InputLabel id="demo-simple-select-standard-label" className="userInput">Choose Cheese Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="cheese"
                                    name="cheese"
                                    label="cheese"
                                    value={values.cheese}
                                    onChange={handleChange}
                                    error={errors.cheese && touched.cheese}
                                    onBlur={handleBlur}
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"Mozzarella"}>Mozzarella</MenuItem>
                                    <MenuItem value={"Gorgonzola"}>Gorgonzola</MenuItem>
                                    <MenuItem value={"Parmesan"}>Parmesan</MenuItem>
                                    <MenuItem value={"Robiola"}>Robiola</MenuItem>
                                </Select>
                                <FormHelperText>{errors.cheese && touched.cheese && errors.cheese}</FormHelperText>
                            </div>
                            
                            <Button className="submitBtn" variant="contained" size="medium"  type="submit">Add Product</Button>
                        </form>
                    </CardContent>
                </Card>
            </article>
        </section>
    )
}

export default CustomPizza
