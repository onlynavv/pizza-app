import React,{useState, useEffect} from 'react'
import "./Login.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link, Redirect } from 'react-router-dom';
import './AdminLogin.css'
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from './context';

const AdminLogin = () => {
    const history = useHistory()

    const {setAdmin, isAdminLoggedIn, authenticate} = useGlobalContext()

    const [singleAdmin,setSingleAdmin] = useState({adminname:'',password:''})
    const [handleError, setHandleError] = useState("")

    useEffect(() => {
        if(!authenticate){
            isAdminLoggedIn()
        }
    }, [])

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setSingleAdmin({...singleAdmin, [name]:value})
    }

    console.log(authenticate)

    // if(authenticate){
    //     return <Redirect to="/" />
    // }

    const handleLogin = async() => {
        try{
            const resp = await fetch('https://pizza-api-task.herokuapp.com/pizzas/auth/admin/login', {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(singleAdmin)
                })

        const data = await resp.json()
        
        setSingleAdmin(data.adminFromDB.adminname)
        console.log(singleAdmin)
        console.log(data)

        if(resp.ok){
            
            const {token, adminFromDB} = data
            localStorage.setItem("token", JSON.stringify(token))
            localStorage.setItem("admin", JSON.stringify(data.adminFromDB))
            setAdmin(token, adminFromDB)

            setSingleAdmin({adminname:'',password:''})
        }else{
            throw new Error(data.msg)
        }

        }

        catch(error){
            
            setHandleError(error.toString())
        }
    }

    return (
        <section>
            <article className="container login-wrapper">
            <h3>Login</h3>
              <Card className="form-card">
                <CardContent className="form-cardContent">
                    <form className="form-wrapper">
                        <div className="form-control">
                            <label>Enter Admin Name</label>
                            <input type="email" placeholder="enter your admin name" value={singleAdmin.adminname} onChange={handleChange} id="adminname" name="adminname"></input>
                        </div>
                        <div className="form-control">
                            <label>Enter Password</label>
                            <input type="password" placeholder="enter your password" value={singleAdmin.password} onChange={handleChange} id="password" name="password"></input>
                        </div>
                        <div className='form-control error-div'>
                            <p>{handleError}</p>
                        </div>
                        <Button className="submitBtn" variant="contained" size="medium" onClick={handleLogin}>login</Button>
                        <Link to="/">FORGOT PASSWORD?</Link>
                        <Link to="/">Create New Account</Link>
                    </form>
                </CardContent>
            </Card>
            </article>
        </section>
    )
}

export default AdminLogin
