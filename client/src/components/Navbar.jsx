import React ,{useContext }from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'

export const Navbar=()=>{
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const renderList=()=>{
    if (state) {
      return [
        <>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/createpost">Create Post</Link></li>
        <li><Link to="/myfollowingpost">My following</Link></li>
        <li>
        <button className="btn waves-effect waves-light #e57373 red lighten-1
" type="submit" name="action" 
              onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}>LOGOUT
            
            </button> 
        </li>
        </>
      ]
    }else{
      return[<>
      <li><Link to="/signin">Sign in</Link></li>
      <li><Link to="/signup">Sign up</Link></li>
      </>
      ]
    }
  }
    return (<nav>
        <div className="nav-wrapper">
          <Link to={state?"/":"/signin" }className="brand-logo left b">Lockdown Network</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </nav>)
}

