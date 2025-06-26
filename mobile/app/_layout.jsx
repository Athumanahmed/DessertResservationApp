import { Slot } from "expo-router";
import SafeScreen from "../components/SafeScreen";

export default function RootLayout() {
  return (
    <SafeScreen>
      <Slot />
    </SafeScreen>
  );
}

// 1.toaster package import Toast from "react-native-toast-message";
{
  /* <SafeScreen>
      <View style={{ flex: 1 }}>
        <Slot />
        <Toast
          position="center"
          topOffset={50}
          visibilityTime={3000}
          autoHide
        />
      </View>
    </SafeScreen> */
}

// import { ToastProvider } from "react-native-toast-notifications";
//  <SafeScreen>
//       <View style={{ flex: 1 }}>
//         <ToastProvider duration={3000} placement="top">
//           <Slot />
//         </ToastProvider>
//       </View>
//     </SafeScreen>
