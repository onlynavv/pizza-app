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
import {nanoid} from "nanoid"

const validateFormSchema = yup.object({
    base: yup.string().required('Please choose the Pizza Base'),
    sauce: yup.string().required('Please choose the Sauce type'),
    cheese: yup.string().required('Please choose the Cheese type'),
})

const CustomPizza = () => {

    const [showVarietyDiv, setShowVarietyDiv] = useState(false)
    const [showMeatDiv, setShowMeatDiv] = useState(false)

    const [meatInitialValue, setMeatInitialValue] = useState([])
    const [meatValue, setMeatValue] = useState([])
    const [meatItems, setMeatItems] = useState([])

    const [vegInitialValue, setVegInitialValue] = useState([])
    const [veggiesValue, setVeggiesValue] = useState([])
    const [vegItems, setVegItems] = useState([])

    const [pizzaInitialValue, setPizzaInitialValue] = useState([])
    const [sauceInitialValue, setSauceInitialValue] = useState([])
    const [cheeseInitialValue, setCheeseInitialValue] = useState([])

    const [total, setTotal] = useState(0)

    const {addToCart} = useGlobalContext()

    const [ingredients, setIngredients] = useState([])

    const image = "https://www.pngall.com/wp-content/uploads/4/Pepperoni-Dominos-Pizza-PNG-Free-Download.png"

    useEffect(() => {
        fetch("https://pizza-api-task.herokuapp.com/pizzas/ingredients/getIngredients")
        .then((data)=> data.json())
        .then((products)=> setIngredients(products))
    }, [])

    console.log(ingredients)

    useEffect(()=>{
        const meatOptions = ingredients.length > 0 && ingredients.filter((item)=>{return item.ingredientType === "meat"})
        setMeatInitialValue(meatOptions)
        const vegOptions = ingredients.length > 0 && ingredients.filter((item)=>{return item.ingredientType === "veggies"})
        setVegInitialValue(vegOptions)
        const pizzaOptions = ingredients.length > 0 && ingredients.filter((item)=>{return item.ingredientType === "pizzabase"})
        setPizzaInitialValue(pizzaOptions)
        const sauceOptions = ingredients.length > 0 && ingredients.filter((item)=>{return item.ingredientType === "sauce"})
        setSauceInitialValue(sauceOptions)
        const cheeseOptions = ingredients.length > 0 && ingredients.filter((item)=>{return item.ingredientType === "cheese"})
        setCheeseInitialValue(cheeseOptions)
    },[ingredients])

    console.log(meatInitialValue, "meat")
    console.log(vegInitialValue, "veggies")
    console.log(pizzaInitialValue, "pizzabase")
    console.log(sauceInitialValue, "sauce")
    console.log(cheeseInitialValue, "cheese")

    let meatCounter = 0
    let meatPriceCounter = 0

    let veggiesCounter = 0
    let veggiesPriceCounter = 0

    const handleMeatChange = (e) => {
        console.log(e.target.value)
        let value
        if(e.target.checked){
            value = meatInitialValue.find((item)=>{
                return item.ingredientName === e.target.value
            })
            setMeatValue([...meatValue, value.ingredientName])
        }else{
            const newValue = meatValue.filter((item)=>{return item !== e.target.value})
            setMeatValue(newValue)
        }
        console.log(value)
    }

    console.log(meatValue)

    useEffect(()=>{
        let meatArr = []
        
        for(let i = 0; i<meatValue.length; i++){
            console.log(i)
            console.log(meatValue[i])
            let meatList = meatInitialValue.find((item)=>{return item.ingredientName === meatValue[i]})
            meatArr.push(meatList)
        }
        console.log(meatArr)
        setMeatItems(meatArr)
    },[meatValue])

    const meatTotal = meatItems.reduce((acc, curr)=>{
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
            vegValue = vegInitialValue.find((item)=>{
                return item.ingredientName === e.target.value
            })
            setVeggiesValue([...veggiesValue, vegValue.ingredientName])
        }else{
            const newValue = veggiesValue.filter((item)=>{return item !== e.target.value})
            setVeggiesValue(newValue)
        }
        console.log(vegValue)
    }

    console.log(veggiesValue)

    useEffect(()=>{
        let veggiesArr = []
        
        for(let i = 0; i<veggiesValue.length; i++){
            console.log(i)
            console.log(veggiesValue[i])
            let vegList = vegInitialValue.find((item)=>{return item.ingredientName === veggiesValue[i]})
            veggiesArr.push(vegList)
        }
        console.log(veggiesArr)
        setVegItems(veggiesArr)
    },[veggiesValue])

    const veggiesTotal = vegItems.reduce((acc, curr)=>{
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

    console.log(values.base)

    const addProduct = (values) => {
        const ingredientsList = [values.base, values.sauce, values.cheese,...veggiesValue, ...meatValue]
        
        console.log({_id: nanoid(6),img:image,ingredients:ingredientsList.filter((item)=>{return item !== "none"}),name:"custompizza",price:total})

        addToCart({_id: nanoid(6),img:image,ingredients:ingredientsList.filter((item)=>{return item !== "none"}),name:"custompizza",price:total})
        console.log(values)
    }

    // pizza base total

    let baseValue = pizzaInitialValue.length > 0 && pizzaInitialValue.find((item)=>{
        return item.ingredientName === values.base
    })

    console.log(baseValue)

    let sauceValue = sauceInitialValue.length > 0 && sauceInitialValue.find((item)=>{
        return item.ingredientName === values.sauce
    })

    let cheeseValue = cheeseInitialValue.length > 0 && cheeseInitialValue.find((item)=>{
        return item.ingredientName === values.cheese
    })

    useEffect(() => {
        let customPizzaTotal = meatTotal + veggiesTotal + (baseValue ? baseValue.price : 0) + (sauceValue ? sauceValue.price : 0) + (cheeseValue ? cheeseValue.price : 0)
        setTotal(customPizzaTotal)
    }, [meatItems, vegItems, baseValue, sauceValue, cheeseValue])

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
                                    
                                        {pizzaInitialValue.length > 0 && pizzaInitialValue.map((item)=>{
                                            const {_id, ingredientName} = item   
                                                return <MenuItem value={ingredientName} key={_id}>{ingredientName}</MenuItem>
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
                                        
                                        {sauceInitialValue.length > 0 && sauceInitialValue.map((item)=>{
                                            const {_id, ingredientName} = item    
                                                return <MenuItem value={ingredientName} key={_id}>{ingredientName}</MenuItem>
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
                                        
                                        {cheeseInitialValue.length > 0 && cheeseInitialValue.map((item)=>{  
                                            const {_id, ingredientName}  = item
                                                return <MenuItem value={ingredientName} key={_id}>{ingredientName}</MenuItem>
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
                                                {vegInitialValue.map((item)=>{
                                                    const {_id,ingredientName} = item
                                                    return (
                                                        <div key={_id}>
                                                            <input type="checkbox" name={ingredientName} value={ingredientName} id={ingredientName} className="form-check-input" onChange={handleVeggiesChange}></input>
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
                                                {meatInitialValue.map((item)=>{
                                                    const {_id,ingredientName} = item
                                                    return(
                                                        <div key={_id}>
                                                            <input type="checkbox" name={ingredientName} value={item.ingredientName} id={ingredientName} className="form-check-input" onChange={handleMeatChange}></input>
                                                            <label htmlFor={ingredientName} className="form-check-label">{ingredientName}</label>
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
                    

                    {vegItems.length > 0 && (
                        <div className='meat-priceCount'>
                            <h4>Veggies:</h4>
                            {vegItems && vegItems.map((item)=>{
                                const {_id, ingredientName, price} = item
                                veggiesCounter++
                                console.log(veggiesCounter)
                                return (
                                    <div key={_id} style={{display:"flex",justifyContent:"space-between"}}>
                                        <p>{ingredientName} * 1</p>
                                        {veggiesCounter > 3 ? <p>Rs. {price}</p> : <p>Rs. {price * 0}(free)</p>}
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {meatItems.length > 0 && (
                        <div className='meat-priceCount'>
                            <h4>Meat:</h4>
                            {meatItems && meatItems.map((item)=>{
                                meatCounter++
                                console.log(meatCounter)
                                const {_id, ingredientName, price} = item
                                return (
                                    <div key={_id} style={{display:"flex",justifyContent:"space-between"}}>
                                        <p>{ingredientName} * 1</p>
                                        {meatCounter > 1 ? <p>Rs. {price}</p> : <p>Rs. {price * 0}(free)</p>}
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
