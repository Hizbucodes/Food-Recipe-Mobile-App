import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import YoutubeIframe from "react-native-youtube-iframe";

const RecipeDetailScreen = () => {
  const route = useRoute();

  let item = route?.params?.item;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [isYoutubeVideoLoading, setIsYoutubeVideoLoading] = useState(true);

  const getRecipes = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
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
    getRecipes(item?.idMeal);
  }, [item?.idMeal]);

  const ingredients = (meal) => {
    if (!meal) {
      return [];
    }
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  const onVideoReady = () => {
    setIsYoutubeVideoLoading(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      <View>
        <Animated.Image
          entering={FadeInDown.duration(500).springify()}
          sharedTransitionTag={item?.idMeal}
          style={styles.image}
          source={{ uri: item?.strMealThumb }}
        />
      </View>

      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={40} color="#F39204" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButtonContainer}>
          <Entypo name="heart" size={40} color="#97928B" />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator
          size={"70"}
          style={styles.activityIndicator}
          color={"#F39204"}
        />
      ) : (
        <Animated.View
          entering={FadeInDown.duration(700).springify().damping(6)}
          style={styles.recipeDetailsContainer}
        >
          {recipes?.map((recipe) => (
            <View key={recipe?.idMeal}>
              <Text style={styles.recipeTitle}>{recipe?.strMeal}</Text>
              <Text style={styles.recipeArea}>{recipe?.strArea}</Text>

              <View style={styles.ingredientsContainer}>
                <Text style={styles.ingredientsTextHeadline}>Ingredients</Text>

                <View style={styles.ingredientBulletPointsContainer}>
                  {ingredients(recipe).map((i) => (
                    <View key={i} style={styles.ingredientWithMeasure}>
                      <View key={i} style={styles.ingredientBulletPoints} />
                      <View style={styles.ingredientsTextContainer}>
                        <Text style={styles.strMeasure}>
                          {recipe["strMeasure" + i]}
                        </Text>
                        <Text>{"  "}</Text>
                        <Text style={styles.strIngredient}>
                          {recipe["strIngredient" + i]}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.instructionsContainer}>
                <Text style={styles.instructionTextHeadline}>Instructions</Text>

                <Text style={styles.strInstructions}>
                  {recipe?.strInstructions}
                </Text>
              </View>

              {recipe?.strYoutube && (
                <View style={styles.recipeYoutubeVideoContainer}>
                  <Text style={styles.recipeYoutubeVideoTextHeadline}>
                    Recipe YouTube Video
                  </Text>
                  {isYoutubeVideoLoading && (
                    <ActivityIndicator size={"50"} color={"#F39204"} />
                  )}
                  <YoutubeIframe
                    videoId={getYoutubeVideoId(recipe?.strYoutube)}
                    height={400}
                    onReady={onVideoReady}
                  />
                </View>
              )}
            </View>
          ))}
        </Animated.View>
      )}
    </ScrollView>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: 480,
    height: 500,
    resizeMode: "cover",
    borderRadius: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    margin: 5,
    alignSelf: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 50,
    width: "100%",
    zIndex: 99,
    paddingHorizontal: 20,
  },
  backButtonContainer: {
    backgroundColor: "white",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 5,
  },
  recipeDetailsContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
    flexDirection: "column",
  },
  recipeTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  recipeArea: {
    fontWeight: "500",
    color: "gray",
    fontSize: 16,
  },
  activityIndicator: {
    marginTop: 50,
  },
  ingredientsContainer: {
    marginTop: 30,
  },
  ingredientsTextHeadline: {
    fontWeight: "bold",
    fontSize: 26,
  },
  ingredientBulletPointsContainer: {
    marginTop: 14,
    rowGap: 10,
  },
  ingredientBulletPoints: {
    padding: 3,
    backgroundColor: "#F39204",
    width: 15,
    height: 15,
    borderRadius: "50%",
    marginVertical: 5,
  },
  ingredientsTextContainer: {
    flexDirection: "row",
  },
  ingredientWithMeasure: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  strMeasure: {
    fontWeight: "bold",
    fontSize: 18,
  },
  strIngredient: {
    fontSize: 18,
  },
  instructionsContainer: {
    marginTop: 30,
  },
  instructionTextHeadline: {
    fontWeight: "bold",
    fontSize: 26,
  },
  strInstructions: {
    fontWeight: "400",
    marginTop: 14,
    fontSize: 17,
    letterSpacing: 1,
    lineHeight: 30,
    textAlign: "justify",
  },
  recipeYoutubeVideoContainer: {
    flexDirection: "column",
    rowGap: 20,
    marginTop: 14,
  },
  recipeYoutubeVideoTextHeadline: {
    fontWeight: "bold",
    fontSize: 26,
  },
});
