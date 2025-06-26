import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { getToken } from "../lib/storage";
import { Image } from "expo-image";
import { authStyles } from "../assets/styles/auth.styles";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const token = await getToken();
      setTimeout(() => {
        if (token) {
          router.replace("/(tabs)/HomeScreen");
        } else {
          router.replace("/(auth)/LoginScreen");
        }
      }, 2000);
    };

    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F3E5F5" barStyle="dark-content" />
      <View style={authStyles.imageContainer}>
        <Image
          source={require("../assets/images/i1.png")}
          style={authStyles.image}
          contentFit="contain"
        />
      </View>
      <Text style={styles.title}>Dessert Reserve</Text>
      <ActivityIndicator size="large" color="#6A1B9A" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3E5F5", // ✅ pale purple background
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4A148C", // deep purple text
    marginBottom: 20,
  },
});
