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
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const [show, setShow] = useState(false);
  const { loading, login, userInfo } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (userInfo) {
      history.push("/chats");
    }
  }, [userInfo]);

  const handleClick = () => setShow(!show);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    login(values?.email, values?.password);
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <VStack spacing={"5px"}>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isRequired
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel>Email</FormLabel>
                  <Input {...field} placeholder="Enter Your Email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  id="password"
                  isRequired
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Enter Your Password"
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
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              type="submit"
              colorScheme="blue"
              w={"100%"}
              mt={"15px"}
              // onClick={submitHandler}
              // onClick={() => login(email, password)}
              isLoading={loading}
            >
              Login
            </Button>
            {/* <Button
            variant={"solid"}
            colorScheme="red"
            w={"100%"}
            onClick={() => {
              setEmail("guest@example.com");
              setPassword("123456");
            }}
          >
            Get Guest User Credentials
          </Button> */}
          </VStack>
        </Form>
      </Formik>
    </Box>
  );
};

export default Login;
