import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Button,
  Pressable,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Break from "./components/Break";
import { auth } from "../firebaseConfig";
import { router, Stack } from "expo-router";
import TravelLogo from "../assets/destination.png";

export default function Login() {
  const handleLoginWithGoogle = () => {
    console.log("1231");
  };
  return (
    <>
      <View style={styles.container}>
        <Image
          source={TravelLogo}
          contentFit="cover"
          style={{ width: 125, height: 125 }}
        />
        <Break />
        <Stack.Screen
          options={{
            title: "",
            headerShown: false,
            headerStyle: { backgroundColor: "#f4511e" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Formik
          initialValues={{ password: "", email: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid Email").required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values, formikActions) => {
            setTimeout(() => {
              auth
                .signInWithEmailAndPassword(values.email, values.password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  if (user) {
                    router.push("/pages/home");
                  }
                  // ...
                })
                .catch((error) => {
                  const errorMessage = error.message;
                  alert(errorMessage);
                });
              // Important: Make sure to setSubmitting to false so our loading indicator
              // goes away.
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
                placeholder="Email Address"
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
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Pressable
                  onPress={props.handleSubmit}
                  loading={props.isSubmitting}
                  style={styles.buttonSignIn}
                >
                  <Text style={{ color: "white" }}>Sign In</Text>
                </Pressable>

                <Break />
                <Pressable
                  onPress={props.handleSubmit}
                  loading={props.isSubmitting}
                  style={styles.buttonSignUp}
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
}

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

  buttonSignIn: {
    backgroundColor: "#f4511e",
    borderRadius: "8",
    width: 250,
    alignItems: "center",
    height: 40,
    justifyContent: "center",
  },
  buttonSignUp: {
    borderColor: "#f4511e",
    borderWidth: 1,
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
