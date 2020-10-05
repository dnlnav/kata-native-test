import React, { useState } from "react";
import { StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDamageCalculator } from "../hooks/useDamageCalculator";
import { getDamage, getTotalDamage } from "../utils/damage";

import { Text, TextInput, View, ScrollView } from "./Themed";

export default function AttackCalculator() {
  const [redPotion, setRedPotion] = useState<string>();
  const [bluePotion, setBluePotion] = useState<string>();
  const [greenPotion, setGreenPotion] = useState<string>();
  const [yellowPotion, setYellowPotion] = useState<string>();
  const [greyPotion, setGreyPotion] = useState<string>();
  const [showResults, setShowResults] = useState<boolean>(false);

  const getPotionsArray = () => [
    parseInt(redPotion || "0"),
    parseInt(bluePotion || "0"),
    parseInt(greenPotion || "0"),
    parseInt(yellowPotion || "0"),
    parseInt(greyPotion || "0"),
  ];

  const [potionNumberPerStep, setPotions] = useDamageCalculator(
    getPotionsArray()
  );

  const totalDamage = getTotalDamage(potionNumberPerStep);

  const handleButtonPress = () => {
    setPotions(getPotionsArray());
    setShowResults(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Pociones Disponibles</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View style={styles.inputGroupContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.title}>Poción Roja</Text>
            <TextInput
              style={styles.input}
              value={redPotion}
              keyboardType="number-pad"
              onChangeText={setRedPotion}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.title}>Poción Azul</Text>
            <TextInput
              style={styles.input}
              value={bluePotion}
              keyboardType="number-pad"
              onChangeText={setBluePotion}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.title}>Poción Verde</Text>
            <TextInput
              style={styles.input}
              value={greenPotion}
              keyboardType="number-pad"
              onChangeText={setGreenPotion}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.title}>Poción Amarilla</Text>
            <TextInput
              style={styles.input}
              value={yellowPotion}
              keyboardType="number-pad"
              onChangeText={setYellowPotion}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.title}>Poción Gris</Text>
            <TextInput
              style={styles.input}
              value={greyPotion}
              keyboardType="number-pad"
              onChangeText={setGreyPotion}
            />
          </View>
          <Button
            onPress={handleButtonPress}
            title="Determinar Mejor Ataque"
            color="#841584"
          />
        </View>
        {showResults && (
          <View style={styles.resultsContainer}>
            <Text style={styles.title}>Resultado:</Text>
            {totalDamage > 0 ? (
              <View>
                {potionNumberPerStep.map((potionNumber, index) => (
                  <Text key={index} style={styles.text}>
                    - Ataque {index + 1}: usar {potionNumber}{" "}
                    {potionNumber > 1 ? "pociones" : "poción"} para un daño de{" "}
                    {getDamage(potionNumber)}%
                  </Text>
                ))}
                <Text style={styles.title}>TOTAL: {totalDamage}%</Text>
              </View>
            ) : (
              <Text style={styles.title}>No hay ataques disponibles</Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginVertical: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  inputGroupContainer: {
    alignItems: "stretch",
    marginBottom: 32,
    width: "80%",
  },
  inputGroup: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputLabel: {
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
  resultsContainer: {
    width: "80%",
  },
});
