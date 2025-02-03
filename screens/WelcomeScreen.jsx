import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const ringOnePadding = useSharedValue(0);
  const ringTwoPadding = useSharedValue(0);
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      ringOnePadding.value = 0;
      ringTwoPadding.value = 0;
      ringOnePadding.value = withSpring(ringOnePadding.value + hp(5));
      ringTwoPadding.value = withSpring(ringTwoPadding.value + hp(5));
    }, 100);

    setTimeout(() => {
      navigation.navigate("Home");
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Animated.View style={[styles.ringOne, { padding: ringOnePadding }]}>
        <Animated.View style={[styles.ringTwo, { padding: ringTwoPadding }]}>
          <Image
            style={styles.image}
            source={require("../assets/recipe-app-image.png")}
          />
        </Animated.View>
      </Animated.View>

      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Meal Foodiez</Text>
        <Text style={styles.subHeadingText}>Food is always right</Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F39204",
    justifyContent: "center",
    alignItems: "center",
  },
  ringOne: {
    borderRadius: "50%",
    backgroundColor: "#F3E279",
  },
  ringTwo: {
    borderRadius: "50%",
    backgroundColor: "#F39204",
  },
  image: {
    width: hp(20),
    height: hp(20),
    resizeMode: "cover",
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
    marginTop: 50,
  },
  headingText: {
    fontWeight: "bold",
    fontSize: hp(7),
    color: "white",
  },
  subHeadingText: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "white",
  },
});
