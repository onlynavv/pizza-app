import React,{useState, useEffect} from 'react'
import "./Login.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './Login.css'
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from './context';

const Login = () => {
    const history = useHistory()

    const {setUser, isUserLoggedIn, userauthenticate} = useGlobalContext()

    const [singleUser,setSingleUser] = useState({username:'',password:''})
    const [handleError, setHandleError] = useState("")

    useEffect(() => {
        if(!userauthenticate){
            isUserLoggedIn()
        }
    }, [])

    console.log(userauthenticate)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setSingleUser({...singleUser, [name]:value})
    }

    // const handleLogin = () => {
    //     fetch('https://pizza-api-task.herokuapp.com/pizzas/auth/user/login', {
    //     method:'POST',
    //     headers: { "Content-Type": "application/json"},
    //     body: JSON.stringify(singleUser)
    // }).then(()=> history.push('/'))
    // }

    const handleLogin = async() => {
        try{
            const resp = await fetch('https://pizza-api-task.herokuapp.com/pizzas/auth/user/login', {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(singleUser)
                })

        const data = await resp.json()
        
        setSingleUser(data.userFromDB.username)
        console.log(singleUser)
        console.log(data)

        if(resp.ok){
            
            const {token, userFromDB} = data
            console.log(token, userFromDB)
            localStorage.setItem("usertoken", JSON.stringify(token))
            localStorage.setItem("user", JSON.stringify(data.userFromDB))
            setUser(token, userFromDB)

            setSingleUser({username:'',password:''})
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
                            <label>Enter Username</label>
                            <input type="email" placeholder="enter your email address" value={singleUser.username} onChange={handleChange} id="username" name="username"></input>
                        </div>
                        <div className="form-control">
                            <label>Enter Password</label>
                            <input type="password" placeholder="enter your password" value={singleUser.password} onChange={handleChange} id="password" name="password"></input>
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

export default Login
