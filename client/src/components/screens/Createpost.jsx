import React,{useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

export const Createpost = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const history = useHistory()

    useEffect(() => {
       if (url) {
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer"+localStorage.getItem("jwt")
            },
            body:JSON.stringify(
                {
                    title,
                    body,
                    pic:url
                }
            )
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"#d50000 red accent-4"})
            }else{
               M.toast({html:"Created Post Successfully",classes:"#9575cd deep-purple lighten-3"})
                history.push("/")
            }
        }).catch(err=>{
          console.log(err);
        }) 
       }
    }, [url])

    const postDetails=()=>{
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
    return (
        <div className="card input-filed" style={{
            margin:"10px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input type="text" placeholder="Title"
            value={title}
            onChange={(e)=>{
                setTitle(e.target.value)
            }}></input>
            <input type="text" placeholder="Caption"
            value={body}
            onChange={(e)=>{
                setBody(e.target.value)}}>
                </input>
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
        <button className="btn waves-effect waves-light #e57373 red lighten-2"
        onClick={()=>postDetails()}>
            UPLOAD POST
        </button>
        </div>
    )
}
