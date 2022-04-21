import React from "react";

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
  return (
    <form onSubmit={submitHandler}>
      <input {...register("email")} type="email" placeholder="Email" />
      <p>{errors.email?.message}</p>
      <input {...register("password")} type="password" placeholder="Password" />
      <p>{errors.password?.message}</p>
      <input type="submit" value="Login" />
      <p>{authError}</p>
    </form>
  );
};

export default LoginForm;
