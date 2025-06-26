import { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { getToken, removeToken } from "../../lib/storage";
import AxiosInstance from "../../lib/dessertAPI";
import LottieView from "lottie-react-native";
import { COLORS } from "../../constants/colors";
import { useRouter } from "expo-router";

const AccountScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getUserProfile = async () => {
    try {
      const token = await getToken();

      if (!token) {
        Alert.alert("Error", "User not logged in.");
        return;
      }

      const { data } = await AxiosInstance.get("/api/v1/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUser(data.data);
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.log("Failed to fetch profile", error.message);
      Alert.alert("Error", "Failed to load user profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await removeToken(); // remove from AsyncStorage
    router.replace("/(auth)/LoginScreen"); // login screen
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderanimate}>
        <LottieView
          source={require("../../assets/animations/loader.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Details</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email}</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{user?.phone}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.primary,
  },
  card: {
    backgroundColor: COLORS.grayLight,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontWeight: "600",
    color: COLORS.textDark,
    marginTop: 10,
  },
  value: {
    color: COLORS.textLight,
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  animation: {
    width: 200,
    height: 200,
  },

  loaderanimate: {
    flex: 1,
    backgroundColor: "#F3E5F5",
    justifyContent: "center",
    alignItems: "center",
  },
});
