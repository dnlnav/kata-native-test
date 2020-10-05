import React, { useState } from "react";
import { StyleSheet, Button } from "react-native";
import { useDamageCalculator } from "../hooks/useDamageCalculator";
import { getDamage, getTotalDamage } from "../utils/damage";
import InputGroup from "./InputGroup";

import { Text, View, ScrollView } from "./Themed";

export default function AttackCalculator() {
  const [redPotion, setRedPotion] = useState<string>("");
  const [bluePotion, setBluePotion] = useState<string>("");
  const [greenPotion, setGreenPotion] = useState<string>("");
  const [yellowPotion, setYellowPotion] = useState<string>("");
  const [greyPotion, setGreyPotion] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);

  const getPotionsArray = () => {
    const getNumber = (string: string) => parseInt(string) || 0;

    return [redPotion, bluePotion, greenPotion, yellowPotion, greyPotion].map(
      getNumber
    );
  };

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
          <InputGroup
            title="Poción Roja"
            value={redPotion}
            onChange={setRedPotion}
          />
          <InputGroup
            title="Poción Azul"
            value={bluePotion}
            onChange={setBluePotion}
          />
          <InputGroup
            title="Poción Verde"
            value={greenPotion}
            onChange={setGreenPotion}
          />
          <InputGroup
            title="Poción Amarilla"
            value={yellowPotion}
            onChange={setYellowPotion}
          />
          <InputGroup
            title="Poción Gris"
            value={greyPotion}
            onChange={setGreyPotion}
          />
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
                    {potionNumber > 1
                      ? "pociones distintas "
                      : "poción restante "}
                    para un daño de {getDamage(potionNumber)}%
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
  resultsContainer: {
    width: "80%",
  },
});
