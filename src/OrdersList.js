import React,{useState} from 'react'
import "./Cart.css"
import OrdersItem from './OrdersItem'
import "./OrdersList.css"

const OrdersList = ({_id, items, total, orderedAt, orderStatus}) => {
    console.log(items)
    console.log(orderStatus)
    const updatedDate = orderStatus.map((item)=>{
        return new Date(item.updatedAt)
    })

    const [showStage, setShowStage] = useState(false)

    const orderDate = new Date(orderedAt)
    return (
        
            <div className='checkout orders-each'>
                <div className="checkout-left">
                    <div className='orderDetails'>
                        <div className='orderDetails-left'>
                            <h3>Order Id: #{_id}</h3>
                            <h4>Amount Paid: Rs. {total}</h4>
                            <h5>Ordered At: {orderDate.toLocaleDateString()} {orderDate.toLocaleTimeString()}</h5>
                            {orderStatus[3].isCompleted === "true" && <h5>Status: Delivered</h5>}
                        </div>
                        <div className='orderDetails-right'>
                            <button onClick={()=>{setShowStage(!showStage)}}>Track Order</button>
                        </div>
                    </div>
                    {showStage && (
                        <div className="stage-row">
                        <div style={{opacity: orderStatus[0].isCompleted === "true" ? "1" : "0.2"}}>
                            <div className='stage-header'>
                                <img src="/images/paid.png" width={30} height={30} alt="" />
                                <span>Pending</span>
                                {orderStatus[0].isCompleted === "true" && (
                                    <div className="checkedIcon">
                                        <img
                                            className="checkedIcon"
                                            src="/images/checked.png"
                                            width={20}
                                            height={20}
                                            alt=""
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='stage-footer'>
                                <p>{updatedDate[0].toLocaleTimeString() === "Invalid Date" ? "-" : `at: ${updatedDate[0].toLocaleTimeString()}`}</p>
                            </div>
                        </div>
                        <div style={{opacity: orderStatus[1].isCompleted === "true" ? "1" : "0.2"}}>
                            <div className='stage-header'>
                                <img src="/images/bake.png" width={30} height={30} alt="" />
                                <span>Preparing</span>
                                {orderStatus[1].isCompleted === "true" && (
                                    <div className="checkedIcon">
                                        <img
                                            className="checkedIcon"
                                            src="/images/checked.png"
                                            width={20}
                                            height={20}
                                            alt=""
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='stage-footer'>                            
                                    <p>{updatedDate[1].toLocaleTimeString() === "Invalid Date" ? "-" : `at: ${updatedDate[1].toLocaleTimeString()}`}</p>
                            </div>
                        </div>
                        <div style={{opacity: orderStatus[2].isCompleted === "true" ? "1" : "0.2"}}>
                            <div className='stage-header'>
                                <img src="/images/bike.png" width={30} height={30} alt="" />
                                <span>On the way</span>
                                {orderStatus[2].isCompleted === "true" && (
                                    <div className="checkedIcon">
                                        <img
                                            className="checkedIcon"
                                            src="/images/checked.png"
                                            width={20}
                                            height={20}
                                            alt=""
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='stage-footer'>
                                <p>{updatedDate[2].toLocaleTimeString() === "Invalid Date" ? "-" : `at: ${updatedDate[2].toLocaleTimeString()}`}</p>
                            </div>
                        </div>
                        <div style={{opacity: orderStatus[3].isCompleted === "true" ? "1" : "0.2"}}>
                            <div className='stage-header'>
                            <img src="/images/delivered.png" width={30} height={30} alt="" />
                            <span>Delivered</span>
                            {orderStatus[3].isCompleted === "true" && (
                                <div className="checkedIcon">
                                    <img
                                        className="checkedIcon"
                                        src="/images/checked.png"
                                        width={20}
                                        height={20}
                                        alt=""
                                    />
                                </div>
                            )}
                        </div>
                            <div className='stage-footer'>
                                <p>{updatedDate[3].toLocaleTimeString() === "Invalid Date" ? "-" : `at: ${updatedDate[3].toLocaleTimeString()}`}</p>
                            </div>
                        </div>
                    </div>
                    )}
                    <div>
                        {items ? (
                            items.map((item)=>{
                            const {_id} = item
                            return(
                                <OrdersItem key={_id} {...item} />
                            )
                        })
                        ) : ""}
                    </div>
                </div>
            </div>
        
    )
}

export default OrdersList
