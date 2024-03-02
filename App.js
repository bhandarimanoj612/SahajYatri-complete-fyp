import AppNavigation from "./src/navigation/AppNavigation";
import { useEffect } from "react";
import * as Location from "expo-location";
import { useState } from "react";
import { UserLocationContext } from "./src/Context/UserLocationContext";
import { AuthProvider } from "./src/Context/AuthContext";
import "react-native-url-polyfill/auto";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </UserLocationContext.Provider>
  );
}
