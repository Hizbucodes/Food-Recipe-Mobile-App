import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";

const Categories = ({ activeCategory, handleChangeCategory, categories }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories?.map((category) => (
          <TouchableOpacity
            onPress={() => handleChangeCategory(category?.strCategory)}
            key={category?.idCategory}
            style={styles.container}
          >
            <Image
              style={[
                styles.image,
                {
                  backgroundColor:
                    category?.strCategory === activeCategory
                      ? "#F39204"
                      : "#E8E9ED",
                },
              ]}
              source={{ uri: category?.strCategoryThumb }}
            />
            <Text style={styles.categoryText}>{category?.strCategory}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",

    borderRadius: 50,
  },
  categoryText: {
    fontWeight: "bold",
  },
});
