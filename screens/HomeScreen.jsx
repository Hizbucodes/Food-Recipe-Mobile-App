import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Categories from "../components/Categories";
import axios from "axios";
import Recipes from "../components/Recipes";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setRecipes([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (response.status === 200) {
        const data = response.data.categories;
        console.log("Successfullt Fetched Categories: ", data);
        setCategories(data);
      }
    } catch (err) {
      if (err.response) {
        console.error("Error from response: ", err.message);
      } else if (err.request) {
        console.error("Error from request", err.message);
      } else {
        console.error("Something went very wrong", err.message);
      }
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      const data = response?.data?.meals;
      console.log("Successfully Fetched Recipes: ", data);
      setRecipes(data);
    } catch (err) {
      if (err.response) {
        console.error("Error from response: ", err.message);
      } else if (err.request) {
        console.error("Error from request", err.message);
      } else {
        console.error("Something went very wrong", err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.header}>
          <Entypo name="user" size={35} color="black" />
          <FontAwesome name="bell-o" size={24} color="black" />
        </View>

        <View style={styles.headerGreetingContainer}>
          <Text style={styles.username}>Hello, Hizbullah</Text>
          <Text style={styles.greetingText}>
            Make your own food, stay at{" "}
            <Text style={styles.greetingTextHome}>Home</Text>
          </Text>
        </View>

        <View style={styles.searchTextContainer}>
          <Ionicons name="search" size={24} color="black" />
          <TextInput
            style={styles.searchTextInput}
            placeholder="Search any recipe"
          />
        </View>

        <View>
          {categories?.length > 0 && (
            <Categories
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
              categories={categories}
            />
          )}
        </View>

        <View>
          <Recipes isLoading={isLoading} recipes={recipes} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  scrollView: {
    paddingTop: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  headerGreetingContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    rowGap: 20,
    marginTop: 30,
  },
  username: {
    fontWeight: "bold",
    fontSize: 15,
    color: "gray",
  },
  greetingText: {
    textAlign: "justify",
    fontSize: 30,
    fontWeight: "bold",
  },
  greetingTextHome: {
    color: "#F39204",
  },
  searchTextContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchTextInput: {
    fontWeight: "500",
    marginLeft: 10,
    width: "100%",
  },
});
