import { useEffect, useState } from "react";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { View, ActivityIndicator } from "react-native";

export function withAuth(Component: React.ComponentType) {
  return function ProtectedComponent(props: any) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      async function checkAuth() {
        const token = await SecureStore.getItemAsync("userToken");
        if (token) {
          setIsAuthenticated(true);
        } else {
          //router.replace("/(tabs)/authentication");
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      }
      checkAuth();
    }, []);

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#ED125B" />
        </View>
      );
    }

    return isAuthenticated ? <Component {...props} /> : null;
  };
}
