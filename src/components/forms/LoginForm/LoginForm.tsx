import React from "react";

import Logger from "@utilities/tools/Logger";

import "./LoginForm.css";

interface LoginFormProps {
  register: any;
  errors: any;
  authError: string;
  submitHandler: any;
}

const LoginForm: React.FunctionComponent<LoginFormProps> = ({
  register,
  errors,
  authError,
  submitHandler,
}) => {
  // Render Log
  React.useEffect(() => {
    Logger.logComponentRender(LoginForm.name);
  });

  return (
    <form className="login-form" onSubmit={submitHandler}>
      <h1 className="center-content">Login</h1>
      <br />
      <input {...register("email")} type="email" placeholder="Email" />
      <input {...register("password")} type="password" placeholder="Password" />
      <br />
      <input className="button" type="submit" value="Login" />
      <ul>
        {errors.email?.message ? <li>{errors.email.message}</li> : ""}
        {errors.password?.message ? <li>{errors.password.message}</li> : ""}
        {authError ? <li>{authError}</li> : ""}
      </ul>
    </form>
  );
};

export default LoginForm;
