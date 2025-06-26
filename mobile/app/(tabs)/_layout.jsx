import { Redirect, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import * as SecureStore from "expo-secure-store";

const TabsLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync("token");
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/animations/loader.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/LoginScreen" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Reservations"
        options={{
          title: "Reservations",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3E5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 200,
    height: 200,
  },
});
