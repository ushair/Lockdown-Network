import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import {useParams} from 'react-router-dom'


export const UserProfile = () => {
    const {state,dispatch} = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [profile, setProfile] = useState()
    const [prof, setProf] = useState({})
    const [userProfile, setuserProfile] = useState("")
    const [userEmail,setuserEmail]=useState("")
    const {userid} = useParams()
    const [userfollower, setFollower] = useState([])
    const [showfollow, setShowFollow] = useState(state?!state.following.includes(userid):true)
    const [userpic, setUserpic] = useState("")


    useEffect(() => {
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer"+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setuserProfile(result.user.name)
            setuserEmail(result.user.email)
            setProfile(result.posts.length)
            setPosts(result.posts)
            setProf(result)
            setUserpic(result  .user.pic)
            setFollower(result.user.follower)
        })
        },[])

    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer"+ localStorage.getItem("jwt")     
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",
            payload:{
                following:data.following,
                followers:data.followers}})
                localStorage.setItem("user",JSON.stringify(data))
                setProf((prevState)=>{
                   return{ user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,
                        data._id]
                    }
                   }
                })
                setShowFollow(false)

        })
    }

    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer"+ localStorage.getItem("jwt")     
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",
            payload:{
                following:data.following,
                followers:data.followers}})
                localStorage.setItem("user",JSON.stringify(data))
                setProf((prevState)=>{
                    const newFollower = prevState.user.followers
                    .filter(item=>item!=data._id)
                   return{ user:{
                        ...prevState,
                        users:{
                            ...prevState.user,
                            followers:newFollower
                        }
                    }}
                })
                setShowFollow(true)
                window.location.reload();
        })
    }


    return (
    <>{
        posts?
        <div style={{maxWidth:"550px",margin:"0px auto"}}> 
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"25px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}} 
                    src={userpic} alt=""></img>
                </div>
                <div>
                    <h4>{userProfile}</h4>
                    <h5>{userEmail}</h5>
                    <h5></h5>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-around",
                        width:"108%"
                    }}>
                        <h6>{profile} posts</h6>
                        <h6>{prof.user === undefined?"loading":prof.user.followers===undefined?"loading":prof.user.followers.length} Followers</h6>
                        <h6>{prof.user === undefined?"loading":prof.user.following===undefined?"loading":prof.user.following.length} Following</h6>
                    </div>

                    {!JSON.parse(localStorage.getItem("user")).following.includes(userid)&&showfollow?
                    <button className="btn waves-effect waves-light #e57373 blue lighten-2"
                     type="submit" 
                     name="action"
                     onClick={()=>{
                        followUser()
                        }}
                     >Follow
                     </button>:
                     <button className="btn waves-effect waves-l ight #e57373 red lighten-2"
                     type="submit" 
                     name="action"
                     onClick={()=>{
                        unfollowUser()
                        }}
                     >Unfollow
                     </button> }
                     <br/>
                </div>
            </div>
        
            <div className="gallery">
            {
            posts.map(item=>{
                return(
                <img key={item._id} className="item"
                 src={item.photo} 
                 alt="f"/>
                        )
                    })
                }
            </div>        
        </div>
        :"Loading..."
    }
        
    </>
        )
}
