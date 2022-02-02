import React,{useState,useEffect} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import "./Register.css"
import "./EditIngredients.css"
import { useGlobalContext } from './context'

const EditIngredients = () => {

    const {ingredients, updateIngredients} = useGlobalContext()

    const [ingredientTypeValue, setIngredientType] = useState("")
    const [ingredientName, setIngredientName] = useState("")
    const [ingredientNameValue, setIngredientNameValue] = useState("")
    const [ingredientDetails, setIngredientDetails] = useState({})
    const [ingredientPrice, setIngredientPrice] = useState("")
    const [ingredientStock, setIngredientStock] = useState("")

    const handleIngTypeChange = (e) => {
        console.log(e.target.value)
        setIngredientType(e.target.value)
    }

    console.log(ingredients)
    console.log(ingredientTypeValue && ingredients.filter((item)=>{return item.ingredientType === ingredientTypeValue}))

    useEffect(() => {
        const ingName = ingredients.filter((item)=>{return item.ingredientType === ingredientTypeValue})
        setIngredientName(ingName)
    }, [ingredientTypeValue])

    console.log(ingredientName)

    const handleIngName = (e) => {
        console.log(e.target.value)
        setIngredientNameValue(e.target.value)
    }

    useEffect(()=>{
        const ingDetails = ingredients.find((item)=>{return item.ingredientName === ingredientNameValue})
        setIngredientDetails(ingDetails)
        setIngredientPrice(ingDetails && ingDetails.price)
        setIngredientStock(ingDetails && ingDetails.stock)
    },[ingredientNameValue])

    console.log(ingredientDetails)

    const handlePrice = (e) => {
        console.log(e.target.value)
        setIngredientPrice(e.target.value)
    }

    const handleStock = (e) => {
        console.log(e.target.value)
        setIngredientStock(e.target.value)
    }

    const handleIngEdit = (e) => {
        e.preventDefault()
        console.log({"ingredientType":ingredientTypeValue, "ingredientName":ingredientNameValue, "price":ingredientPrice, "stock":ingredientStock})
        updateIngredients(ingredientTypeValue, ingredientNameValue, ingredientPrice, ingredientStock,setIngredientType, setIngredientNameValue, setIngredientPrice, setIngredientStock)
    }

    return (
        <section>
            <article className="container register-wrapper">
              <Card className="form-card">
                <CardContent className="form-cardContent">
                  <h3>Edit Ingredients</h3>
                <form className="form-wrapper editForm-ingredient">
                    <div className="form-control pizza-form-div">
                        <InputLabel id="demo-simple-select-standard-label" className="userInput">Select Ingredient Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="type"
                                name="type"
                                label="type"
                                onChange={handleIngTypeChange}
                                value={ingredientTypeValue}
                                >
                                <MenuItem value={"pizzabase"}>Pizza Base</MenuItem>
                                <MenuItem value={"sauce"}>Sauce</MenuItem>
                                <MenuItem value={"cheese"}>Cheese</MenuItem>
                                <MenuItem value={"veggies"}>Veggies</MenuItem>
                                <MenuItem value={"meat"}>Meat</MenuItem>
                            </Select>
                    </div>

                    {ingredientTypeValue && (
                        <div className="form-control pizza-form-div">
                            <InputLabel id="demo-simple-select-standard-label" className="userInput">Select Ingredient Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="name"
                                    name="name"
                                    label="name"
                                    onChange={handleIngName}
                                    value={ingredientNameValue}
                                    >
                                    {ingredientName.map((item)=>{
                                        const {ingredientName, _id} = item
                                        return(
                                            <MenuItem key={_id} value={ingredientName}>{ingredientName}</MenuItem>
                                        )
                                    })}
                                </Select>
                        </div>
                    )}

                    {ingredientNameValue && (
                        <>
                            <div className="form-control">
                                <TextField className="userInput" label='Change Price' placeholder='Enter Price' id="price" name="price" value={ingredientPrice} onChange={handlePrice} multiline variant="standard" />
                            </div>
                            <div className="form-control">
                                <TextField className="userInput" label='Change Stock' placeholder='Enter Stock' id="stock" name="stock" value={ingredientStock} onChange={handleStock} multiline variant="standard" />
                            </div>
                            <Button className="submitBtn" variant="contained" size="medium" type="submit" onClick={handleIngEdit}>Edit</Button>
                        </>
                    )}
                    
                </form>
                </CardContent>
                </Card>
            </article>
        </section>
    )
}

export default EditIngredients
