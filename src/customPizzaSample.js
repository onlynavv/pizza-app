import React,{useState, useEffect} from 'react'
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
import "./SubTotal.css"
import {AiFillPlusCircle, AiFillMinusCircle} from "react-icons/ai"
import { useGlobalContext } from './context';

const validateFormSchema = yup.object({
    base: yup.string().required('Please choose the Pizza Base'),
    sauce: yup.string().required('Please choose the Sauce type'),
    cheese: yup.string().required('Please choose the Cheese type'),
})

const CustomPizza = () => {

    const [showVarietyDiv, setShowVarietyDiv] = useState(false)
    const [showMeatDiv, setShowMeatDiv] = useState(false)

    const [meatValue, setMeatValue] = useState([])
    const [veggiesValue, setVeggiesValue] = useState([])

    const [total, setTotal] = useState(0)

    const {addToCart} = useGlobalContext()

    const [ingredients, setIngredients] = useState([])

    const image = "https://www.pngall.com/wp-content/uploads/4/Pepperoni-Dominos-Pizza-PNG-Free-Download.png"

    useEffect(() => {
        fetch("http://localhost:9000/pizzas/ingredients/getIngredients")
        .then((data)=> data.json())
        .then((products)=> setIngredients(products))
    }, [])

    console.log(ingredients)

    let meatCounter = 0
    let meatPriceCounter = 0

    let veggiesCounter = 0
    let veggiesPriceCounter = 0

    const handleMeatChange = (e) => {
        console.log(e.target.value)
        let value
        if(e.target.checked){
            value = ingredients[0].ingredients.find((item)=>{
                return item.ingredientName === e.target.value
            })
            setMeatValue([...meatValue, value])
        }else{
            const newValue = meatValue.filter((item)=>{return item.ingredientName != e.target.value})
            setMeatValue(newValue)
        }
        console.log(value)
    }

    console.log(meatValue)

    const meatTotal = meatValue.reduce((acc, curr)=>{
        meatPriceCounter++
        if(meatPriceCounter <= 1){
            return 0
        }else{
            return acc = acc + curr.price
        }
        
    },0)

    console.log(meatTotal)

    const handleVeggiesChange = (e) => {
        let vegValue
        if(e.target.checked){
            vegValue = ingredients[1].ingredients.find((item)=>{
                return item.ingredientName === e.target.value
            })
            setVeggiesValue([...veggiesValue, vegValue])
        }else{
            const newValue = veggiesValue.filter((item)=>{return item.ingredientName != e.target.value})
            setVeggiesValue(newValue)
        }
        console.log(vegValue)
    }

    console.log(veggiesValue)

    const veggiesTotal = veggiesValue.reduce((acc, curr)=>{
        veggiesPriceCounter++
        if(veggiesPriceCounter <= 3){
            return 0
        }else{
            return acc = acc + curr.price
        }
        
    },0)

    console.log(veggiesTotal)

    

    const {handleBlur, handleChange, handleSubmit, errors, values, touched} = useFormik(
        {
            initialValues:{base:"none",sauce:"none",cheese:"none"},
            validationSchema: validateFormSchema,
            onSubmit: (values) => {
                addProduct(values)
            }
        }
    )

    const addProduct = (values) => {
        console.log({_id: new Date().getTime().toString(),img:image,ingredients:{...values,veggies:veggiesValue, meat:meatValue}, price:total,name:"custompizza"})

        addToCart({_id: new Date().getTime().toString(),img:image,ingredients:{...values,veggies:veggiesValue, meat:meatValue}, price:total,name:"custompizza"})
    }

    // pizza base total

    let baseValue = ingredients.length > 0 && ingredients[2].ingredients.find((item)=>{
        return item.ingredientName === values.base
    })

    let sauceValue = ingredients.length > 0 && ingredients[3].ingredients.find((item)=>{
        return item.ingredientName === values.sauce
    })

    let cheeseValue = ingredients.length > 0 && ingredients[4].ingredients.find((item)=>{
        return item.ingredientName === values.cheese
    })

    console.log(sauceValue)

    useEffect(() => {
        let customPizzaTotal = meatTotal + veggiesTotal + (baseValue ? baseValue.price : 0) + (sauceValue ? sauceValue.price : 0) + (cheeseValue ? cheeseValue.price : 0)
        setTotal(customPizzaTotal)
    }, [meatValue, veggiesValue, baseValue, sauceValue, cheeseValue])

    return (
        <section className="container custom-pizza-wrapper">
            <div className="custom-image">
                <img src={image} alt="customPizza"></img>
            </div>
            <div className="custom-pizza-form">
                <article className='form-left'>
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
                                        <MenuItem value="none">
                                            <em>None</em>
                                        </MenuItem>
                                        {/* <MenuItem value={"Pizza Bagels"}>Pizza Bagels</MenuItem>
                                        <MenuItem value={"Cheese-Stuffed Crus"}>Cheese-Stuffed Crust</MenuItem>
                                        <MenuItem value={"Flatbread"}>Flatbread</MenuItem>
                                        <MenuItem value={"Thin Crust"}>Thin Crust</MenuItem>
                                        <MenuItem value={"New York Style"}>New York Style</MenuItem> */}
                                        {ingredients.length > 0 && ingredients[2].ingredients.map((item, index)=>{    
                                                return <MenuItem value={item.ingredientName} key={item.ingredientName}>{item.ingredientName}</MenuItem>
                                        })}
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
                                        <MenuItem value="none">
                                            <em>None</em>
                                        </MenuItem>
                                        {/* <MenuItem value={"Pesto"}>Pesto</MenuItem>
                                        <MenuItem value={"White Garlic Sauce"}>White Garlic Sauce</MenuItem>
                                        <MenuItem value={"Garlic Ranch Sauce"}>Garlic Ranch Sauce</MenuItem>
                                        <MenuItem value={"Hummus"}>Hummus</MenuItem>
                                        <MenuItem value={"Buffalo Sauce"}>Buffalo Sauce</MenuItem> */}
                                        {ingredients.length > 0 && ingredients[3].ingredients.map((item, index)=>{    
                                                return <MenuItem value={item.ingredientName} key={item.ingredientName}>{item.ingredientName}</MenuItem>
                                        })}
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
                                        <MenuItem value="none">
                                            <em>None</em>
                                        </MenuItem>
                                        {/* <MenuItem value={"Mozzarella"}>Mozzarella</MenuItem>
                                        <MenuItem value={"Gorgonzola"}>Gorgonzola</MenuItem>
                                        <MenuItem value={"Parmesan"}>Parmesan</MenuItem>
                                        <MenuItem value={"Robiola"}>Robiola</MenuItem> */}
                                        {ingredients.length > 0 && ingredients[4].ingredients.map((item, index)=>{    
                                                return <MenuItem value={item.ingredientName} key={item.ingredientName}>{item.ingredientName}</MenuItem>
                                        })}
                                    </Select>
                                    <FormHelperText>{errors.cheese && touched.cheese && errors.cheese}</FormHelperText>
                                </div>

                                <div className='varieties-accordion'>
                                    <div className="varieties-box">
                                        <div className='varieties-header'>
                                            <InputLabel id="demo-simple-select-standard-label" className="userInput">Select Veggies</InputLabel>
                                            <p onClick={()=>{setShowVarietyDiv(!showVarietyDiv)}} className='accordion-btn'>
                                                {showVarietyDiv ?  <AiFillMinusCircle /> : <AiFillPlusCircle />}
                                            </p>
                                        </div>
                                        {showVarietyDiv && (
                                            <div className='checkbox-variety'>
                                                {ingredients[1].ingredients.map((item)=>{
                                                    const {ingredientName} = item
                                                    return (
                                                        <div key={ingredientName}>
                                                            <input type="checkbox" name={ingredients[1].ingredientType} value={ingredientName} id={ingredientName} className="form-check-input" onChange={handleVeggiesChange}></input>
                                                            <label htmlFor={ingredientName} className="form-check-label">{ingredientName}</label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className='varieties-accordion'>
                                    <div className="varieties-box">
                                        <div className='varieties-header'>
                                            <InputLabel id="demo-simple-select-standard-label" className="userInput">Select Meat</InputLabel>
                                            <p onClick={()=>{setShowMeatDiv(!showMeatDiv)}} className='accordion-btn'>
                                                {showMeatDiv ?  <AiFillMinusCircle /> : <AiFillPlusCircle />}
                                            </p>
                                        </div>
                                        {showMeatDiv && (
                                            <div className='checkbox-variety'>
                                                {ingredients[0].ingredients.map((item)=>{
                                                    return(
                                                        <div key={item.ingredientName}>
                                                            <input type="checkbox" name={ingredients[0].ingredientType} value={item.ingredientName} id={item.ingredientName} className="form-check-input" onChange={handleMeatChange}></input>
                                                            <label htmlFor={item.ingredientName} className="form-check-label">{item.ingredientName}</label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <Button className="submitBtn customBtn" variant="contained" size="medium"  type="submit">Add Product</Button>
                            </form>
                        </CardContent>
                    </Card>
                </article>
                <div className='form-right'>
                    
                    {values.base && (
                        <div>
                            <h4>Base:</h4>
                            {baseValue && (
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <p>{baseValue.ingredientName} * 1</p>
                                    <p>Rs.{baseValue.price}</p>
                                </div>
                            )}
                        </div>
                    )}
                    {values.sauce && (
                        <div>
                            <h4>Sauce:</h4>
                            {sauceValue && (
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <p>{sauceValue.ingredientName} * 1</p>
                                    <p>Rs.{sauceValue.price}</p>
                                </div>
                            )}
                        </div>
                    )}
                    {values.cheese && (
                        <div>
                            <h4>Cheese:</h4>
                            {cheeseValue && (
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <p>{cheeseValue.ingredientName} * 1</p>
                                    <p>Rs.{cheeseValue.price}</p>
                                </div>
                            )}
                        </div>
                    )}
                    {/* {values.cheese && <p>{values.cheese}</p>}
                    {values.sauce && <p>{values.sauce}</p>} */}

                    {veggiesValue.length > 0 && (
                        <div className='meat-priceCount'>
                            <h4>Veggies:</h4>
                            {veggiesValue && veggiesValue.map((item, index)=>{
                                veggiesCounter++
                                console.log(veggiesCounter)
                                return (
                                    <div key={index} style={{display:"flex",justifyContent:"space-between"}}>
                                        <p>{item.ingredientName} * 1</p>
                                        {veggiesCounter > 3 ? <p>Rs. {item.price}</p> : <p>Rs. {item.price * 0}(free)</p>}
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {meatValue.length > 0 && (
                        <div className='meat-priceCount'>
                            <h4>Meat:</h4>
                            {meatValue && meatValue.map((item, index)=>{
                                meatCounter++
                                console.log(meatCounter)
                                return (
                                    <div key={index} style={{display:"flex",justifyContent:"space-between"}}>
                                        <p>{item.ingredientName} * 1</p>
                                        {meatCounter > 1 ? <p>Rs. {item.price}</p> : <p>Rs. {item.price * 0}(free)</p>}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                        
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:"25px"}}>
                        <p><b>custom price total:</b></p>
                        <p><b>Rs. {total}</b></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CustomPizza
