import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Itemgoal from "./Itemgoal";

const ListOfGoalComponet = ({
  title,
  description,
  editClick,
  deleteClick,
  cardClick,
}) => {
  return (
    <View style={styles.container}>
      <Itemgoal
        title={title}
        description={description}
        editClick={editClick}
        deleteClick={deleteClick}
        cardClick={cardClick}
      />
    </View>
  );
};

export default ListOfGoalComponet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
