import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { getToken, removeToken } from "../../lib/storage";
import { useRouter } from "expo-router";
import AxiosInstance from "../../lib/dessertAPI";
import { favoritesStyles } from "../../assets/styles/favorites.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import NoFavoritesFound from "../../components/NoFavoritesFound";
import RecipeCard from "../../components/RecipeCard";

const Reservations = () => {
  const router = useRouter();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReservations = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) return;

      const { data } = await AxiosInstance.get(
        `/api/v1/users/user-reservations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        const favorites = data.data;

        // transform the data to match the RecipeCard component's expected format
        const transformedFavorites = favorites.map((favorite) => ({
          ...favorite,
          id: favorite.recipeId,
        }));
        setFavoriteRecipes(transformedFavorites);
      }
    } catch (error) {
      Alert.alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleSignOut = async () => {
    await removeToken();
    router.replace("/(auth)/LoginScreen");
  };

  useEffect(() => {
    getReservations();
  }, []);
  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={require("../../assets/animations/loader.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
    );
  return (
    <View style={favoritesStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={favoritesStyles.header}>
          <Text style={favoritesStyles.title}>Reservations</Text>
          <TouchableOpacity
            style={favoritesStyles.logoutButton}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={favoritesStyles.recipesSection}>
          <FlatList
            data={favoriteRecipes}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={favoritesStyles.row}
            contentContainerStyle={favoritesStyles.recipesGrid}
            scrollEnabled={false}
            ListEmptyComponent={<NoFavoritesFound />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Reservations;

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
