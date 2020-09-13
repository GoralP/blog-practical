import React from "react";
import { Form, Input, Container, Button, FormGroup } from "reactstrap";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/actions/login";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useHistory, Redirect, Link } from "react-router-dom";
import logo from "../images/logo1.jpg";

const signupSchema = yup.object().shape({
  username: yup.string().required("Username is a required field."),
  password: yup.string().required("Password is a required field."),
});

const Home = () => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(login(data.username, data.password, history));
    console.log(data);
  };

  return (
    <Container className="background-image background" fluid={true}>
      <Form
        className="form-layout"
        onSubmit={handleSubmit(onSubmit)}
        id="myform"
      >
        <img className="logo logo-center " src={logo} alt="logo" />

        <h2 className="text-center mb-4 login-heading ">LOGIN</h2>
        <FormGroup>
          <Controller
            as={Input}
            id="user"
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

        <FormGroup className="">
          <Controller
            as={Input}
            id="pwd"
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
          <Button className="bg-info login-btn" name="submit">
            Sign In
          </Button>
        </FormGroup>

        <hr></hr>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/registration">
            <span className="font-weight-bold">Sign up</span>
          </Link>
        </p>
      </Form>
    </Container>
  );
};

export default Home;
