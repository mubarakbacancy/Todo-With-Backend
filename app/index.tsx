import { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import jsonserver from "./api/jsonserver";
import ListOfGoalComponet from "./componets/Listofgoals";

export default function Index() {
  const [value, setValue] = useState({
    title: "",
    description: "",
    goalsList: [],
  });

  const [editGoal, setEditGoal] = useState(null);
  const title = useRef(null);
  const description = useRef(null);

  const onSubmitClick = async () => {
    const titleTrimmed = value.title.trim();
    const descriptionTrimmed = value.description.trim();

    // Check if title or description is empty
    if (titleTrimmed === "" || descriptionTrimmed === "") {
      alert("Title and description cannot be empty!");
      return;
    }

    if (editGoal) {
      setValue((prev) => ({
        ...prev,
        goalsList: prev.goalsList.map((goal) =>
          goal.id === editGoal.id
            ? {
                ...goal,
                title: value.title,
                description: value.description,
              }
            : goal
        ),
        title: "",
        description: "",
      }));

      // Fix: Use the correct values for title and description, not refs.
      const response = await jsonserver.put(`/goalsList/${editGoal.id}`, {
        id: editGoal.id,
        title: value.title,
        description: value.description,
      });

      console.log("Edit goal :: ", response.data);

      setEditGoal(null);
    } else {
      // Check for duplicate
      const isDuplicate = value.goalsList.some(
        (goal) =>
          goal.title.trim() === titleTrimmed &&
          goal.description.trim() === descriptionTrimmed
      );

      if (isDuplicate) {
        alert("This goal already exists!");
      } else {
        const result = await jsonserver.post("/goalsList", {
          title: value.title,
          description: value.description,
        });

        setValue((prev) => ({
          ...prev,
          goalsList: [
            ...prev.goalsList,
            {
              id: result.data.id,
              title: value.title,
              description: value.description,
            },
          ],
          title: "",
          description: "",
        }));
      }
    }

    title.current?.focus();
  };

  const editClick = async (title, description, id) => {
    setValue((prev) => ({
      ...prev,
      title: title,
      description: description,
    }));

    setEditGoal({ id: id, title: title, description: description });
  };

  const deleteClick = async (id) => {
    Alert.alert("Delete Record", "Are you sure to delete the record?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel");
        },
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          setValue((prev) => ({
            ...prev,
            goalsList: prev.goalsList.filter((goal) => goal.id !== id),
          }));

          const response = await jsonserver.delete(`/goalsList/${id}`);
          console.log("Delete Goal", response.status);
        },
      },
    ]);
  };

  const cardClick = ({ id }) => {
    console.log("Clicked on Card!");
  };

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await jsonserver.get("/goalsList");
        // Update the state with the fetched goals
        if (response && response.data) {
          setValue((prev) => ({
            ...prev,
            goalsList: response.data,
          }));
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={style.container}>
          <Text style={style.textTitle}>Welcome to todo App</Text>

          <TextInput
            ref={title}
            style={style.inputTextStyle}
            value={value.title}
            onChangeText={(value) =>
              setValue((prev) => ({ ...prev, title: value }))
            }
          />

          <TextInput
            ref={description}
            style={style.inputTextStyle}
            value={value.description}
            onChangeText={(value) =>
              setValue((prev) => ({ ...prev, description: value }))
            }
          />
          <TouchableOpacity
            style={style.buttonStyle}
            onPress={() => {
              onSubmitClick();
            }}
          >
            <Text style={style.buttonTextStyle}>
              {editGoal ? `Update` : `Add`}
            </Text>
          </TouchableOpacity>

          <Text style={style.listTitleStyle}>List of Goals:</Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={value.goalsList}
            ListFooterComponent={<View style={{ marginBottom: 60 }} />}
            renderItem={({ item }) => (
              <ListOfGoalComponet
                title={item.title}
                description={item.description}
                editClick={() =>
                  editClick(item.title, item.description, item.id)
                }
                deleteClick={() => deleteClick(item.id)}
                cardClick={() => cardClick(item.id)}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  inputTextStyle: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "mediumpurple",
    paddingStart: 15,
    marginTop: 20,
    backgroundColor: "lightgray",
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: "mediumorchid",
    borderRadius: 10,
  },
  buttonTextStyle: {
    fontSize: 18,
    paddingVertical: 12,
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
  },
  listTitleStyle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
