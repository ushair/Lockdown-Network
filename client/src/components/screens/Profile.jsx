import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'

export const Profile = () => {
    const {state,dispatch} = useContext(UserContext)

    const [mypics, setPics] = useState([])
    useEffect(() => {
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer"+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
        },[])
    return (
        <div style={{maxWidth:"550px",margin:"0px auto"}}> 
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"25px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}} 
                    src={state?state.pic:"loading"} alt=""></img>
                </div>
                <div>
                    <h4>{state?state.name:"Loading..."}</h4>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-around",
                        width:"108%"
                    }}>
                        <h6>{mypics.length} Posts</h6>
                        <h6>{state?state.followers.length:"0"} Followers</h6>
                        <h6>{state?state.following.length:"0"} Following</h6>
                    </div>
                </div>
            </div>
        
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img key={item._id} className="item" src={item.photo} alt="f"/>
                    
                        )
                    })
                }
            </div>        
        </div>
    )
}
