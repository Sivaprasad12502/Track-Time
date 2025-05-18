import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "../register/style.module.css";
import useFrom from "../../hooks/useFrom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../component/Firebase/firebase";
import { toast } from "react-toastify";
import SignWithGoogle from "../../component/signInWithGoogle/signInWithGoogle";

export default function Login() {
  const { values, handleChange, resetForm } = useFrom({
    name: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, values.email, values.password);

      console.log("User logged in Successfully");
      window.location.href = "/user";
      toast.success("user logged in Successfully", {
        position: "top-center",
      });
    } catch (e) {
      console.log(e.message);
      toast.error(e.message, {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <h1>loading...please wait!!!</h1>;
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperContainer}>
        <h3>Login To Your Account</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            onChange={handleChange}
            name="name"
            value={values.name}
          />
          <label htmlFor="">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <label htmlFor="">
            password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button type="submit">sign in</button>
          <SignWithGoogle />
        </form>
      </div>
      {/* <div>
        <Link to={"/user"}>click</Link>
      </div> */}
    </div>
  );
}
