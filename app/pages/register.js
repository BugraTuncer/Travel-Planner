import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { router, Stack } from "expo-router";
import { auth } from "../../firebaseConfig";
import Break from "../components/Break";
import LoginLogo from "../../assets/login.png";

const Register = () => {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={LoginLogo}
          contentFit="cover"
          style={{ width: 125, height: 125 }}
        />
        <Break />
        <Stack.Screen
          options={{
            title: "Register",
            headerStyle: { backgroundColor: "#f4511e" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Formik
          initialValues={{ password: "", confirmPassword: "", email: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid Email").required("Required"),
            password: Yup.string().required("Required"),
            confirmPassword: Yup.string().oneOf(
              [Yup.ref("password"), null],
              "Passwords must match"
            ),
          })}
          onSubmit={(values, formikActions) => {
            setTimeout(() => {
              auth
                .createUserWithEmailAndPassword(values.email, values.password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  if (user) {
                    Alert.alert("Success", "Succesfully registered", [
                      { text: "Ok", onPress: () => router.push("/login") },
                    ]);
                  }
                  // ...
                })
                .catch((error) => {
                  const errorMessage = error.message;
                  Alert.alert(errorMessage);
                  // ..
                });
              formikActions.setSubmitting(false);
            }, 500);
          }}
        >
          {(props) => (
            <>
              <TextInput
                onChangeText={props.handleChange("email")}
                onBlur={props.handleBlur("email")}
                value={props.values.email}
                placeholder="Email"
                style={styles.input}
                ref={(el) => (this.emailInput = el)}
              />
              {props.touched.email && props.errors.email ? (
                <Text style={styles.error}>{props.errors.email}</Text>
              ) : null}
              <Break />
              <TextInput
                onChangeText={props.handleChange("password")}
                onBlur={props.handleBlur("password")}
                value={props.values.password}
                placeholder="Password"
                style={styles.input}
                secureTextEntry
              />
              {props.touched.password && props.errors.password ? (
                <Text style={styles.error}>{props.errors.password}</Text>
              ) : null}
              <Break />
              <TextInput
                onChangeText={props.handleChange("confirmPassword")}
                onBlur={props.handleBlur("confirmPassword")}
                value={props.values.confirmPassword}
                placeholder="Confirm Password"
                style={styles.input}
                secureTextEntry
              />
              {props.touched.confirmPassword && props.errors.confirmPassword ? (
                <Text style={styles.error}>{props.errors.confirmPassword}</Text>
              ) : null}
              <Break />
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Break />
                <Pressable
                  onPress={props.handleSubmit}
                  loading={props.isSubmitting}
                  style={styles.buttonRegister}
                >
                  <Text style={{ color: "black" }}>Sign Up</Text>
                </Pressable>
                <Break />
              </View>
            </>
          )}
        </Formik>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    margin: 8,
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
  buttonRegister: {
    backgroundColor: "#f4511e",
    borderRadius: "8",
    width: 250,
    alignItems: "center",
    height: 40,
    justifyContent: "center",
  },
  input: {
    borderBottomWidth: 1,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderColor: "#f4511e",
  },
});

export default Register;
