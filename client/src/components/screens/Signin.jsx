
import React, { useState ,useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from '../../App'

export const Signin = () => {
    const {state,dispatch} = useContext(UserContext)
    const [email,setemail]= useState()
    const [password,setpassword]= useState()
    const history = useHistory()
    const PostData =()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            M.toast({html:"Invalid Email ID",classes:"#d50000 red accent-4"})
            return
        }      fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    password:password,
                    email:email
                }
            )
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                M.toast({html:"Invalid",classes:"#d50000 red accent-4"})
            }else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Sign in Sucessfull",classes:"#9575cd deep-purple lighten-3"})
                history.push("/")
            }
        }).catch(err=>{
          console.log(err);
        })  
    }
    
    return (
        <div>
        <div className="mycard">
        <div className="card auth-card">
            <h3>Lockdown Network</h3>
            <input
            type ="text"
            placeholder="Email"
            value={email}
            onChange={(e)=>{
                setemail(e.target.value)
            }}
            />
            <input
            type ="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>{
                setpassword(e.target.value)
            }}
            />
            <button className="btn waves-effect waves-light #e57373 red lighten-2
" type="submit" name="action">LOGIN
            <i className="material-icons right"
            onClick={()=>{
                PostData()
            }}>send</i>
            </button> 
            <h6><Link to="/signup">Don't have an account? Click here</Link></h6>       
        </div>
        </div>
        </div>
    )
}
