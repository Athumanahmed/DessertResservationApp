import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleOptionPress = (option) => {
    Alert.alert(option, `You tapped on "${option}"`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>
      <SettingItem
        icon="person-outline"
        label="Edit Profile"
        onPress={() => handleOptionPress("Edit Profile")}
      />
      <SettingItem
        icon="lock-closed-outline"
        label="Change Password"
        onPress={() => handleOptionPress("Change Password")}
      />

      {/* Notifications */}
      <Text style={styles.sectionTitle}>Notifications</Text>
      <View style={styles.item}>
        <View style={styles.left}>
          <Ionicons
            name="notifications-outline"
            size={20}
            color={COLORS.textDark}
          />
          <Text style={styles.label}>Push Notifications</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleToggleNotifications}
          thumbColor={notificationsEnabled ? COLORS.primary : "#ccc"}
        />
      </View>

      {/* App */}
      <Text style={styles.sectionTitle}>App</Text>
      <SettingItem
        icon="language-outline"
        label="Language"
        onPress={() => handleOptionPress("Language")}
      />
      <SettingItem
        icon="moon-outline"
        label="Dark Mode"
        onPress={() => handleOptionPress("Dark Mode")}
      />

      {/* Others */}
      <Text style={styles.sectionTitle}>Support</Text>
      <SettingItem
        icon="help-circle-outline"
        label="Help & Feedback"
        onPress={() => handleOptionPress("Help & Feedback")}
      />
      <SettingItem
        icon="information-circle-outline"
        label="About App"
        onPress={() => handleOptionPress("About App")}
      />
    </ScrollView>
  );
};

const SettingItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.left}>
      <Ionicons name={icon} size={20} color={COLORS.textDark} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#ccc" />
  </TouchableOpacity>
);

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    gap: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 10,
  },
  item: {
    backgroundColor: COLORS.grayLight,
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  label: {
    fontSize: 14,
    color: COLORS.textDark,
  },
});
