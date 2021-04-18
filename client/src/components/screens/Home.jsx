import React, { useContext, useEffect, useState } from 'react'
import {UserContext} from '../../App'
import M from 'materialize-css'
import { Link } from 'react-router-dom'

export const Home = () => {
    const [data, setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(() => {
       fetch('/allpost',{
           headers:{
               "Authorization":"Bearer"+ localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
            console.log(result);
            setData(result)
       })    
    },[])

    const deletePost = (postId)=>{
        fetch(`/deletepost/${postId}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer"+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            const newData= data.filter(item=>{
                return item._id !== result.id
            })
            M.toast({html:"Post Deleted",classes:"#9575cd deep-purple lighten-3"})
            setData(newData)
        })
    }

    const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer"+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if (item._id==result._id) {
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err);
        
        })
    }

    const unlikePost = (id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer"+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if (item._id==result._id) {
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err);
        })
    }

    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer"+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                name:localStorage.getItem("user").name,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            const newData = data.map(item=>{
                if (item._id==result._id) {
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err);  
            })
    }

    function refreshPage() {
    setTimeout(()=>{
        window.location.reload(false);
    }, 300);
    console.log('page to reload')
}

    return (
        <div className="home">
            {data.map(item=>{
                return(
                <div className="card home-card" key={item._id}>
                <h5><Link to={"/profile/"+item.postedby._id}>{item.postedby.name}</Link>
                <i class="material-icons" 
                style={{float:'right'}}
                onClick={()=>{
                    deletePost(item._id)
                    refreshPage()
                }}>delete</i>
                </h5>
                <div className="card-image">
                    <img src={item.photo} alt=""/>
                </div>
                <div className="card-content">
                {item.likes.includes(state._id)?
                <i class="material-icons" 
                    onClick={()=>{
                    unlikePost(item._id)
                }}>favorite</i>
                :<i class="material-icons" 
                    onClick={()=>{
                    likePost(item._id)
                }}>favorite_border</i> }
                
                
                    <h6>{item.likes.length} likes</h6>
                    <h6>{item.title}</h6>
                    <p>{item.body}</p>
                    {
                        item.comments.map(record=>{
                            return (
                                <h6><span style={{fontWeight:"600"}}>
                                {record.postedBy.name}
                                </span> {record.text}</h6>)
                        })
                    }
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        makeComment(e.target[0].value,item._id)
                    }}>
                        <input type="text" placeholder="add a comment"></input>
                    </form>
                </div>
            </div>
        ) 
            })}
        </div>
    )
}
