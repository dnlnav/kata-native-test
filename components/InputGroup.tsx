import React from "react";
import { StyleSheet } from "react-native";

import { Text, TextInput, View } from "./Themed";

export default function InputGroup({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{title}</Text>
      <TextInput
        style={styles.input}
        value={value}
        keyboardType="number-pad"
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    flex: 2,
    maxWidth: 50,
    padding: 8,
  },
});
