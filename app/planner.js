import React from "react";
import { Text, View, StyleSheet, TextInput, Alert, Button } from "react-native";
import { Constants } from "expo";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Planner() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formik x React Native</Text>
      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string().email("Invalid Email").required("Required"),
        })}
        onSubmit={(values, formikActions) => {
          setTimeout(() => {
            Alert.alert(JSON.stringify(values));
            // Important: Make sure to setSubmitting to false so our loading indicator
            // goes away.
            formikActions.setSubmitting(false);
          }, 500);
        }}
      >
        {(props) =>
          console.log(props) || (
            <View>
              <TextInput
                onChangeText={props.handleChange("name")}
                onBlur={props.handleBlur("name")}
                value={props.values.name}
                autoFocus
                placeholder="Your Name"
                style={styles.input}
                onSubmitEditing={() => {
                  // on certain forms, it is nice to move the user's focus
                  // to the next input when they press enter.
                  this.emailInput.focus();
                }}
              />
              {props.touched.name && props.errors.name ? (
                <Text style={styles.error}>{props.errors.name}</Text>
              ) : null}
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
              <Button
                onPress={props.handleSubmit}
                color="black"
                mode="contained"
                loading={props.isSubmitting}
                disabled={props.isSubmitting}
                style={{ marginTop: 16 }}
                title="Submit"
              >
                Submit
              </Button>
              <Button
                onPress={props.handleReset}
                color="black"
                mode="outlined"
                disabled={props.isSubmitting}
                style={{ marginTop: 16 }}
                title="Reset"
              >
                Reset
              </Button>
            </View>
          )
        }
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    margin: 8,
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    paddingHorizontal: 8,
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
});