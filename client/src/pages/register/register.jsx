import React, { useState } from "react";
import classes from "./style.module.css";
import { Link } from "react-router-dom";
import useFrom from "../../hooks/useFrom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth ,db} from "../../component/Firebase/firebase";
import { setDoc,doc } from "firebase/firestore";
import { toast } from "react-toastify";
import axios from 'axios'
import SignWithGoogle from "../../component/signInWithGoogle/signInWithGoogle";
export default function Register() {
  const { values, handleChange, resetForm } = useFrom({
    name: "",
    email: "",
    password: "",
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
     const userCred= await createUserWithEmailAndPassword(auth, values.email, values.password);
      // const user=auth.currentUser
      const user=userCred.user
      console.log(user)
      if(user){
        //2.Store i Firestore
        await setDoc(doc(db,'Users',user.uid),{
          email:user.email,
          name:values.name,
        })
        const idToken=await user.getIdToken()
        await axios.post("http://localhost:3001/api/register",{
          token:idToken,
          name:values.name
        })
      }
      console.log('User Registared Successuflly')
      toast.success("User Registered Sucessusfully",{
        position:"top-center"
      })
      window.location.href='/user'
    } catch (e) {
      console.log(e.message);
      toast.error(e.message,{
        position:"bottom-center"
      })
    }
    // resetForm();
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperContainer}>
        <h3>Create Your Account</h3>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter name"
            onChange={handleChange}
            name="name"
            value={values.name}
          />
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button type="submit">sumbit</button>
          <SignWithGoogle/>
        </form>
        <div>
          <span>Already have account?</span>{" "}
          <Link to={"/login"}>
            <span>sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
