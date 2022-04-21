import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { authContext } from "@contexts/AuthContext";

import { LoginForm } from "@components";
import { LoginFormValues } from "@utilities/models/forms";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const LoginPage: React.FunctionComponent = () => {
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(schema) });
  const { authenticateUser } = useContext(authContext);
  let navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<LoginFormValues> = (data) => {
    const authResult = authenticateUser(data);
    if (authResult.success) {
      navigate("/profile");
    } else {
      setAuthError(authResult.error);
    }
  };

  return (
    <LoginForm
      register={register}
      errors={errors}
      authError={authError}
      submitHandler={handleSubmit(onSubmitHandler)}
    />
  );
};

export default LoginPage;
