import React from "react";
import { Text, View, StyleSheet, TextInput, Alert, Button } from "react-native";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Break from "./components/Break";
import { auth, GoogleAuthProvider } from "../firebaseConfig";
import { router, Stack } from "expo-router";

export default function Login() {
  const provider = new GoogleAuthProvider();
  const handleLoginWithGoogle = () => {
    console.log("1231");
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "Login",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
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
                  router.push("/planner");
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
            <Button
              onPress={props.handleSubmit}
              loading={props.isSubmitting}
              title="Sign In"
            />
            <Break />
            <Button
              onPress={props.handleSubmit}
              loading={props.isSubmitting}
              title="Sign Up"
            />
            <Break />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  error: {
    margin: 8,
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
  input: {
    paddingHorizontal: 8,
    width: "70%",
    borderColor: "#ddd",
    borderWidth: 1,
    backgroundColor: "#fff",
    height: "13%",
  },
});
