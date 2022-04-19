import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { authContext } from "../contexts/AuthContext";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface LoginFormValues {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const Login: React.FunctionComponent = () => {
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(schema) });
  const { authenticateUser } = useContext(authContext);

  let navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);

    const authResult = authenticateUser(data);
    if (authResult.success) {
      navigate("/profile"); //after saving email the user will be sent to Panel;
    } else {
      setAuthError(authResult.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <input {...register("email")} type="email" placeholder="Email" />
      <p>{errors.email?.message}</p>
      <input {...register("password")} type="password" placeholder="Password" />
      <p>{errors.password?.message}</p>
      <input type="submit" value="Login" />
      <p>{authError}</p>
    </form>
  );
};

export default Login;
