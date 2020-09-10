import React from "react";
import { Form, Input, Container, Button, FormGroup, Label } from "reactstrap";
import { useDispatch } from "react-redux";
import { registration } from "../redux/auth/actions/registration";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useHistory, Redirect } from "react-router-dom";

const signupSchema = yup.object().shape({
  username: yup.string().required("Username is a required field."),
  password: yup.string().required("Password is a required field."),
  email: yup.string().required("Email Address is a required field."),
});

const Registration = () => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(registration(data));
  };

  return (
    <Container className="main-container bg-info background" fluid={true}>
      <Form
        className="form-layout"
        onSubmit={handleSubmit(onSubmit)}
        id="myform"
      >
        <h2 className="text-center mb-4 text-secondary ">SIGN UP</h2>
        <FormGroup>
          <Label>User Name</Label>
          <Controller
            as={Input}
            control={control}
            name="username"
            type="text"
            placeholder="Username"
            defaultValue=""
            ref={register}
            className={errors && errors.username ? "is-invalid" : ""}
          />
          {errors && errors.username && (
            <span className="text-danger">{errors.username.message}</span>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Controller
            as={Input}
            control={control}
            name="password"
            type="password"
            placeholder="Password"
            defaultValue=""
            ref={register}
            className={errors && errors.password ? "is-invalid" : ""}
          />
          {errors && errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Email Address</Label>
          <Controller
            as={Input}
            control={control}
            name="email"
            type="email"
            placeholder="Email address"
            defaultValue=""
            ref={register}
            className={errors && errors.email ? "is-invalid" : ""}
          />
          {errors && errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </FormGroup>

        <Button className="bg-info login-btn" name="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default Registration;
