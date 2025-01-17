import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from '../store/slices/userSlice';

const Homepage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user.user);
  const userStatus = useSelector((state)=>state.user.status);
  console.log(user)

  useEffect(()=>{
    if(userStatus === 'idle')
    {
      dispatch(fetchUserData())
    }
  }, [userStatus, dispatch]);


  if(userStatus === 'loading')
  {
    return <div className="">Loading...</div>
  }


  return (
    <div>
      <h1>{user?.userData?.name}</h1>
      </div>
  )
}

export default Homepage