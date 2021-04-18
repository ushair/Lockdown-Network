import React, {useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

export const Signup = () => {
    
    const [name,setname]= useState()
    const [email,setemail]= useState()
    const [password,setpassword]= useState()
    const history = useHistory()
    const [url, setUrl] = useState(undefined)
    const [image, setImage] = useState("")

    useEffect(() => {
        if (url) {
            uploadFields()
        }       
    }, [url])


    const uploadpic=()=>{
        const formData =new FormData()
        formData.append("file",image)
        formData.append("upload_preset","lockdownnetwork")
        formData.append("cloud_name","ushair")
        fetch("https://api.cloudinary.com/v1_1/ushair/image/upload",{
        method:"post",
        body:formData
        }).then(res=>res.json())
        .then(formData=>{
         setUrl(formData.url);
        }).catch(err=>{
            console.log(err);
        })
    }
    
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            M.toast({html:"Invalid Email ID",classes:"#d50000 red accent-4"})
            return
        }      fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    name:name,
                    password:password,
                    email:email,
                    pic:url
                }
            )
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"#d50000 red accent-4"})
            }else{
                M.toast({html:data.message,classes:"#9575cd deep-purple lighten-3"})
                history.push("/signin")
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    const PostData =()=>{
       if(image){
           uploadpic()
       }else{
           uploadFields()
       }
    }

    return (<div>
        <div className="mycard " >
        <div className="card auth-card ">
            <h3>Lockdown Network</h3>
            <input
            type ="text"
            placeholder="Username"
            value={name}
            onChange={(e)=>{
                setname(e.target.value)
            }}
            />
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
            <div class="file-field input-field">
            <div className="btn waves-effect waves-light #e57373 red lighten-2">
                <span>UPLOAD PHOTO</span>
                <input type="file"
                onChange={(e)=>{
                    setImage(e.target.files[0])
                }}/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
            </div>
            <button
            onClick={()=>{
                PostData()
            }} 
            className="btn waves-effect waves-light #e57373 red lighten-2
" type="submit" name="action">SIGN UP
            <i className="material-icons right">send</i>
            </button>
            <h6><Link to="/signin">Already have an account?</Link></h6>        
        </div>
        </div>
        </div>
    )
}
