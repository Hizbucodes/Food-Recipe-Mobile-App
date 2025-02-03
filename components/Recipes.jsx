import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";

const Recipes = ({ recipes, isLoading }) => {
  const RecipeItems = ({ item, index }) => {
    let isEven = index % 2 == 0;
    return (
      <Pressable
        style={{
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
          marginVertical: 8,
        }}
      >
        <Image
          source={{ uri: item?.strMealThumb }}
          style={[styles.image, { height: index % 3 == 0 ? 200 : 300 }]}
        />
        <View style={styles.recipeTextContainer}>
          <Text style={styles.recipeText}>{item?.strMeal}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recipes</Text>
      {isLoading ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="80"
          color={"#F39204"}
        />
      ) : (
        <View>
          <MasonryList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeItems item={item} index={i} />}
            onEndReachedThreshold={0.1}
          />
        </View>
      )}
    </View>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
  },
  image: {
    width: 200,
    borderRadius: 20,
    marginVertical: 6,
    resizeMode: "cover",
  },
  loadingIndicator: {
    margin: "auto",
    marginTop: "30%",
  },
  recipeText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
  recipeTextContainer: {
    backgroundColor: "#F39204",
    borderRadius: 50,
    paddingVertical: 2.5,
    alignItems: "center",
  },
});
