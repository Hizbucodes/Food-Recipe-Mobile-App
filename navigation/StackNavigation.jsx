import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const StackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Meal-Detail"
        component={RecipeDetailScreen}
        options={({ route }) => (
          { title: route?.params?.title }, { headerShown: false }
        )}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
