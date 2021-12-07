import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { useHistory } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useGlobalContext } from './context';

const Navbar = () => {
    const history = useHistory()

    const { cart } = useGlobalContext()

    return (
            <nav className='navbar'>
                <div className='nav-center'>
                    <h3 onClick={()=>{history.push('/')}} className="logo">PizzaDel</h3>
                    <div className='nav-container'>
                        <Link to='/'>Home</Link>
                        <Link to='/custompizza'>Custom Pizza</Link>
                        <Link to='/orders'>My Orders</Link>
                        <Link to="/cart" className="shop-cart"><ShoppingCartIcon /> {cart.length}</Link>
                    </div>
                </div>
            </nav>
    )
}

export default Navbar
