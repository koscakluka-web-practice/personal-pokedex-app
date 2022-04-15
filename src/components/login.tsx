import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type LoginFormValues = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const Login: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(schema) });

  const onSubmitHandler: SubmitHandler<LoginFormValues> = (data) =>
    console.log({ data });

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <input {...register("email")} type="email" placeholder="Email" />
      <p>{errors.email?.message}</p>
      <input {...register("password")} type="password" placeholder="Password" />
      <p>{errors.password?.message}</p>
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
