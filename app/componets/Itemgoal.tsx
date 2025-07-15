import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Itemgoal = ({
  title,
  description,
  editClick,
  deleteClick,
  cardClick,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.5} onPress={cardClick}>
        <Text style={styles.titlestyle}>My Goal is: </Text>
        <Text style={styles.subtitleStyle}>{title}</Text>
        <View style={{ height: 10 }} />
        <Text style={styles.titlestyle}>My Goal is: </Text>
        <Text style={styles.subtitleStyle}>{description}</Text>
      </TouchableOpacity>

      <View style={styles.viewAction}>
        <TouchableOpacity hitSlop={{ left: 20, right: 5 }} onPress={editClick}>
          <Feather name="edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity hitSlop={{ left: 5 }} onPress={deleteClick}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Itemgoal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },

  titlestyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitleStyle: { fontSize: 14, paddingStart: 20 },
  viewAction: {
    flexDirection: "row",
    gap: 15,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,
    end: 0,
    margin: 10,
  },
});
