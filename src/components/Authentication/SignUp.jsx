import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import postAvatar from "../../utils/postAvatar";
import { AuthContext } from "../../context/AuthContext";

const SignUp = (props) => {
  const [show, setShow] = useState(false);
  const [pic, setPic] = useState();
  const [picUrl, setPicUrl] = useState();
  const { loading, setLoading, signup } = useContext(AuthContext);

  const handleClick = () => setShow(!show);

  const validationScheme = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email address"),
    name: Yup.string().required("Name is Required"),
    password: Yup.string()
      .required("Password is Required")
      .min(6, "Password minimum 6 characters"),
    confirmPassword: Yup.string()
      .required("Password is Required")
      .oneOf([Yup.ref("password"), null], "Password must match"),
    pic: Yup.mixed().optional(),
  });

  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    pic: undefined,
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setLoading(true);

      if (pic && !picUrl) {
        await postAvatar(pic)
          .then(async (link) => {
            // console.log("picLink", link);
            values.pic = link;
            setPicUrl(link);
          })
          .catch((err) => {
            console.log(err.message);
            return setErrors({ pic: err?.message || "Upload Avatar failed" });
          });
      } else {
        values.pic = picUrl;
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log(values);
      signup(values);
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationScheme}
        validateOnChange={false} // Disable validation on change
        validateOnBlur={false} // Disable validation on blur
        onSubmit={handleSubmit}
      >
        <Form>
          <VStack spacing={"8px"}>
            <Field name="name">
              {({ field, form }) => (
                <FormControl id="name" isRequired isInvalid={form.errors.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Enter Your Name"
                    {...field}
                    // onChange={(e) => setName(e.target.value)}
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  id="email"
                  isRequired
                  isInvalid={form.errors.email}
                >
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Enter Your Email"
                    // onChange={(e) => setEmail(e.target.value)}
                    {...field}
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  id="spassword"
                  isRequired
                  isInvalid={form.errors.password}
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Enter Your Password"
                      // onChange={(e) => setPassword(e.target.value)}
                      {...field}
                    />
                    <InputRightElement width={"4.5rem"}>
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleClick}
                        tabIndex={"-1"}
                        // aria-hidden={"true"}
                      >
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="confirmPassword">
              {({ field, form }) => (
                <FormControl
                  id="cpassword"
                  isRequired
                  isInvalid={form.errors.confirmPassword}
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Confirm password"
                      // onChange={(e) => setConfirmPassword(e.target.value)}
                      {...field}
                    />
                    <InputRightElement width={"4.5rem"}>
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleClick}
                        tabIndex={"-1"}
                      >
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {form.errors.confirmPassword}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="pic">
              {({ field, form }) => (
                <FormControl id="pic" isInvalid={form.errors.pic}>
                  <FormLabel>Upload Your Picture (less than 3MB)</FormLabel>
                  <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                    // {...field}
                    onChange={(e) => {
                      setPic(e.target.files[0]);
                      setPicUrl(undefined);
                    }}
                    // onChange={(e) =>
                    //   form.setFieldValue("pic", e.target.files[0])
                    // }
                  />
                  <FormErrorMessage>{form.errors.pic}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              type="submit"
              colorScheme="blue"
              w={"100%"}
              mt={"15px"}
              // onClick={submitHandler}
              isLoading={loading}
            >
              Sign Up
            </Button>
          </VStack>
        </Form>
      </Formik>
    </Box>
  );
};

export default SignUp;
