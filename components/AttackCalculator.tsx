import React, { useState } from "react";
import { StyleSheet, TextInput, Button } from "react-native";
import { useDamageCalculator } from "../hooks/useDamageCalculator";
import { sum } from "../utils/arrayManipulation";
import { getDamage, getTotalDamage } from "../utils/damage";

import { Text, View } from "./Themed";

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

  const handleButtonPress = () => {
    setPotions(getPotionsArray());
    setShowResults(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pociones Disponibles</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.getStartedContainer}>
        <Text style={styles.title}>Poción Roja</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          value={redPotion}
          keyboardType="number-pad"
          onChangeText={setRedPotion}
        />
        <Text style={styles.title}>Poción Azul</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          value={bluePotion}
          keyboardType="number-pad"
          onChangeText={setBluePotion}
        />
        <Text style={styles.title}>Poción Verde</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          value={greenPotion}
          keyboardType="number-pad"
          onChangeText={setGreenPotion}
        />
        <Text style={styles.title}>Poción Amarilla</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          value={yellowPotion}
          keyboardType="number-pad"
          onChangeText={setYellowPotion}
        />
        <Text style={styles.title}>Poción Gris</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          value={greyPotion}
          keyboardType="number-pad"
          onChangeText={setGreyPotion}
        />
        <Button
          onPress={handleButtonPress}
          title="Determinar Mejor Ataque"
          color="#841584"
        />
      </View>
      {showResults && (
        <View>
          <Text style={styles.title}>Resultado:</Text>
          {potionNumberPerStep.map((potionNumber, index) => (
            <Text key={index} style={styles.title}>
              Ataque {index + 1}: usar {potionNumber} pociones para un daño de{" "}
              {getDamage(potionNumber)}%
            </Text>
          ))}
          <Text>TOTAL: {getTotalDamage(potionNumberPerStep)}%</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
});
