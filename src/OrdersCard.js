import React from 'react'
import "./OrdersCard.css"
import "./CheckoutProduct.css"
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik'
import * as yup from 'yup';
import { FormHelperText } from '@mui/material';
import { useGlobalContext } from './context';

const validateFormSchema = yup.object({
    stage: yup.string().required('Please choose the Order Status'),
})

const OrdersCard = ({_id,items, orderStatus, orderedAt, total, userEmail}) => {
    const orderDate = new Date(orderedAt)

    const updatedDate = orderStatus.map((item)=>{
        return new Date(item.updatedAt)
    })

    console.log(updatedDate)

    const {changeStatus} = useGlobalContext()

    const {handleBlur, handleChange, handleSubmit, errors, values, touched} = useFormik(
        {
            initialValues:{stage:"", orderId:_id},
            validationSchema: validateFormSchema,
            onSubmit: (values) => {
                changeStatus(values)
            }
        }
    )

    

    return (
        <div className="orders-container">
            
            <div className="orders-body">
                <div className="orders-info">
                    <h5>Orderid: #{_id}</h5>
                    <h5 className="variant">Ordered At: {orderDate.toLocaleDateString()} {orderDate.toLocaleTimeString()}</h5>
                </div>
                <div className="orders-desc">
                    <h4>user email: {userEmail}</h4>
                    <p className="orders-price">₹{total}</p>
                </div>
                
            </div>
            <h4>Ordered Items:</h4>
            <div className='users-orders-list'>
                    {items.map((item)=>{
                        const {_id, name, qty, size} = item
                        return (
                            <div className='orderCard-product' key={_id}>
                                <div className='orderCardProduct-info'>
                                    <p className='orderCardProduct-title'>{name}</p>
                                    <p className="variant-box">{size}</p>
                                    <div className="orderCard-container">
                                        <p>Quantity: {qty}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="stage-row">
                    <div style={{opacity: orderStatus[0].isCompleted === "true" ? "1" : "0.5"}}>
                        <div className='stage-header'>
                            <img src="/images/paid.png" width={30} height={30} alt="" />
                            <span>Payment</span>
                            <div className="checkedIcon">
                                <img
                                    className="checkedIcon"
                                    src="/images/checked.png"
                                    width={20}
                                    height={20}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className='stage-footer'>
                            <p>{updatedDate[0].toLocaleTimeString() === "Invalid Date" ? "-" : `update at: ${updatedDate[0].toLocaleTimeString()}`}</p>
                        </div>
                    </div>
                    <div style={{opacity: orderStatus[1].isCompleted === "true" ? "1" : "0.5"}}>
                        <div className='stage-header'>
                            <img src="/images/bake.png" width={30} height={30} alt="" />
                            <span>Preparing</span>
                            <div className="checkedIcon">
                                <img
                                    className="checkedIcon"
                                    src="/images/checked.png"
                                    width={20}
                                    height={20}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className='stage-footer'>                            
                                <p>{updatedDate[1].toLocaleTimeString() === "Invalid Date" ? "-" : `update at: ${updatedDate[1].toLocaleTimeString()}`}</p>
                        </div>
                    </div>
                    <div style={{opacity: orderStatus[2].isCompleted === "true" ? "1" : "0.5"}}>
                        <div className='stage-header'>
                            <img src="/images/bike.png" width={30} height={30} alt="" />
                            <span>On the way</span>
                            <div className="checkedIcon">
                                <img
                                    className="checkedIcon"
                                    src="/images/checked.png"
                                    width={20}
                                    height={20}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className='stage-footer'>
                            <p>{updatedDate[2].toLocaleTimeString() === "Invalid Date" ? "-" : `update at: ${updatedDate[2].toLocaleTimeString()}`}</p>
                        </div>
                    </div>
                    <div style={{opacity: orderStatus[3].isCompleted === "true" ? "1" : "0.5"}}>
                        <div className='stage-header'>
                        <img src="/images/delivered.png" width={30} height={30} alt="" />
                        <span>Delivered</span>
                        <div className="checkedIcon">
                            <img
                                className="checkedIcon"
                                src="/images/checked.png"
                                width={20}
                                height={20}
                                alt=""
                            />
                        </div>
                    </div>
                        <div className='stage-footer'>
                            <p>{updatedDate[3].toLocaleTimeString() === "Invalid Date" ? "-" : `update at: ${updatedDate[3].toLocaleTimeString()}`}</p>
                        </div>
                    </div>
                </div>
                <div style={{marginTop:"10px"}}>
                    <form className="form-wrapper" onSubmit={handleSubmit}>
                            <div className="form-control pizza-form-div">
                                <InputLabel id="demo-simple-select-standard-label" className="userInput">Change Order Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="stage"
                                    name="stage"
                                    label="Order Status"
                                    value={values.stage}
                                    onChange={handleChange}
                                    error={errors.stage && touched.stage}
                                    onBlur={handleBlur}
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {/* <MenuItem value={"Pending"}>Pending</MenuItem>
                                    <MenuItem value={"Preparing"}>Preparing</MenuItem>
                                    <MenuItem value={"On the Way"}>On the Way</MenuItem>
                                    <MenuItem value={"Delivered"}>Delivered</MenuItem> */}
                                    {orderStatus.map((item, index)=>{    
                                        if(item.isCompleted === "false"){
                                            return <MenuItem value={item.stage} key={index}>{item.stage}</MenuItem>
                                        }else{
                                            return null
                                        }
                                    })}
                                </Select>
                                <FormHelperText>{errors.stage && touched.stage && errors.stage}</FormHelperText>
                            </div>
                            <Button className="submitBtn" variant="contained" size="medium"  type="submit">Change Status</Button>
                        </form>
                </div>
        </div>
    )
}

export default OrdersCard
