import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { useHistory } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useGlobalContext } from './context';

const Navbar = () => {
    const history = useHistory()

    const [cartCount,setCartCount] = useState(0)

    const { adminSignout, authenticate, userSignout, userauthenticate, user, isUserLoggedIn, cart } = useGlobalContext()

    console.log(userauthenticate, user)

    useEffect(() => {
        if(!userauthenticate){
            isUserLoggedIn()
        }
    }, [])

    useEffect(()=>{
        let count = 0
        cart.forEach(item => {
         count = count + parseInt(item.qty)
        });

        setCartCount(count)
    },[cart,cartCount])

    return (
            <nav className='navbar'>
                <div className='nav-center'>
                    <h3 onClick={()=>{history.push('/')}} className="logo">PizzaDel</h3>
                    <div className='nav-container'>
                        <Link to='/'>Home</Link>
                        <Link to='/custompizza'>Custom Pizza</Link>
                        <Link to='/orders'>My Orders</Link>
                        <Link to="/register">Register</Link>
                        {userauthenticate ? <p onClick={userSignout}>{user.username} (Logout)</p> : <Link to="/login">Login</Link>}
                        <Link to="/admin-register">Admin Register</Link>
                        {authenticate ? <p onClick={adminSignout}>Admin Logout</p> : <Link to="/admin-login">Admin Login</Link>}
                        {authenticate && <Link to="/admin-dashboard">Admin Dashboard</Link>}
                        {authenticate && <Link to="/admin-inventory">Inventory</Link>}
                        {/* <Link to="/cart" className="shop-cart"><ShoppingCartIcon /> {cart.length}</Link> */}
                        <Link to="/cart" className="shop-cart"><ShoppingCartIcon />{cartCount}</Link>
                    </div>
                </div>
            </nav>
    )
}

export default Navbar
