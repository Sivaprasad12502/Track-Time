import React, { useState } from "react";
import classes from "./style.module.css";
import { Link } from "react-router-dom";
import useFrom from "../../hooks/useFrom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../component/Firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import axios from "axios";
import SignWithGoogle from "../../component/signInWithGoogle/signInWithGoogle";
import { BarLoader } from "react-spinners";
const API_URL = process.env.REACT_APP_API_URL;
export default function Register() {
  const { values, handleChange, resetForm } = useFrom({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCred = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCred.user;
      console.log(user);
      if (user) {
        setLoading(false);
        //2.Store i Firestore
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: values.name,
        });
        const idToken = await user.getIdToken();
        await axios.post(`${API_URL}/register`, {
          token: idToken,
          name: values.name,
        });
      }
      console.log("User Registared Successuflly");
      toast.success("User Registered Sucessusfully", {
        position: "top-center",
      });

      window.location.href = "/user";
    } catch (e) {
      setLoading(false);
      console.log(e.message);
      toast.error(e.message, {
        position: "bottom-center",
      });
    }
    // resetForm();
  };
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <BarLoader />
      </div>
    );
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperContainer}>
        <h3>Create Your Account</h3>
        <form onSubmit={handleRegister}>
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            onChange={handleChange}
            name="name"
            value={values.name}
          />
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <label htmlFor="">password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button type="submit">sumbit</button>
          <SignWithGoogle />
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
