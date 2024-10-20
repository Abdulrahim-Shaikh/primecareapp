import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import "../global.css";
import { UserProvider } from "../domain/contexts/UserContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from "../domain/contexts/LanguageContext";
import { BranchesProvider } from "../domain/contexts/BranchesContext";
import { DoctorsProvider } from "../domain/contexts/DoctorsContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const client = new QueryClient();

  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  return (

    <QueryClientProvider client={client}>
      <UserProvider>
        <LanguageProvider>
          <BranchesProvider>
            <DoctorsProvider>
              <Stack initialRouteName="(tabs)">
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(his)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)/SignIn" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)/SignUp" options={{ headerShown: false }} />
                {/* <Stack.Screen name="index" options={{ headerShown: true }} /> */}
                <Stack.Screen
                  name="(auth)/OnBoardingSlider"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(auth)/VerifySuccessfully"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(auth)/ForgetPassword"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(auth)/VerifyOTP"
                  options={{ headerShown: false }}
                />


                <Stack.Screen name="(user)" options={{ headerShown: false }} />
                <Stack.Screen name="(screens)" options={{ headerShown: false }} />
              </Stack>
            </DoctorsProvider>
          </BranchesProvider>
        </LanguageProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
