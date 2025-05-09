import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, db } from '../Firebase/firebase'
import { toast } from 'react-toastify'
import { doc, setDoc } from 'firebase/firestore'
import axios from 'axios'
const APIURL=process.env.REACT_APP_API_URL;
export default function SignWithGoogle() {

  function googleLogin(){
    const provider=new GoogleAuthProvider()
    signInWithPopup(auth,provider).then(async(result)=>{
      console.log(result)
      const user=result.user
      if(result.user){
        //.Store in FireStore
        await setDoc(doc(db,"Users",user.uid),{
          email:user.email,
          name:user.displayName
        })
        //.Get Firebase Id token
        const idToken=await user.getIdToken()
        // store in MongoDB via backedn
        await axios.post(`${APIURL}/api/register`,{
          token:idToken,
          name:user.displayName
        })
        toast.success("User logged in Successfully",{
          position:"top-center"
        })
        window.location.href='/user'
      }

    })
  }
  return (
    <div className='text-white'>
        <p>Or continue with--</p>
        <div className='flex items-center justify-center' onClick={googleLogin}>
          <img src={require("../../assets/google.png")} width={"60%"}/>
        </div>
    </div>
  )
}
