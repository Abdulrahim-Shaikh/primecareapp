import { Pressable, ScrollView, StyleSheet, View, Text } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UpcomingSlider from "../../components/homePage/UpcomingSlider";
import DoctorSpeciality from "../../components/homePage/DoctorSpeciality";
import TopDoctor from "../(screens)/TopDoctor";
import NotificationModal from "../../components/homePage/modal/NotificationModal";
import FavouriteModal from "../../components/homePage/modal/FavouriteModal";
import Header from "../../components/homePage/Header";
import { router } from "expo-router";
import MainMenu from "../../components/homePage/MainMenu";
import { useUserSate } from "../../domain/state/UserState";
import branchService from "../../domain/services/BranchService";
import { useHISSate } from "../../domain/state/HISState";
import { UserContext } from "../../domain/contexts/UserContext";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useFocusEffect } from "expo-router";
import { useBranches } from "../../domain/contexts/BranchesContext";
import { useDoctors } from "../../domain/contexts/DoctorsContext";
import resourceService from "../../domain/services/ResourceService";
import { useSpecialities } from "../../domain/contexts/SpecialitiesContext";
import specialityService from "../../domain/services/SpecialityService";
import { useCities } from "../../domain/contexts/CitiesContext";
import cityMasterService from "../../domain/services/CityMasterService";
import http from "../../domain/services/core/HttpService";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const Home = () => {

  let loggedIn = useUserSate.getState().loggedIn;
  let userBranch = useUserSate.getState().branch;
  const [branches, setBranchesResp] = useState([]);
  const { userData } = useContext(UserContext)
  let { setBranches } = useHISSate();
  let { setCurrentBranch } = useHISSate();
  const [showNotification, setShowNotification] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showFavouriteModal, setShowFavouriteModal] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const [locale, setLocale] = useState(i18n.locale);
  const { branchesData, changeBranches } = useBranches();
  const { doctors, changeDoctors } = useDoctors()
  const {cities, changeCities} = useCities()
  const { allSpecialities, changeSpecialities } = useSpecialities();

  const changeLocale = (locale: any) => {
    i18n.locale = locale;
    setLocale(locale);
  }

  useFocusEffect(
    useCallback(() => {
      const url = http.getURL();
      if (doctors == null || doctors.length == 0) {
        resourceService.getAllDoctorsByDesignation('Doctor').then((res) => {
          changeDoctors(res.data)
        }).then(() => {
          console.log("doctors set")
        })
      }

      if (branchesData == null) {
        branchService.findAll().then((res) => {
          changeBranches(res.data)
        })
          .then(() => {
            console.log("branches set")
          })
      }

      if (allSpecialities == null || allSpecialities.length == 0) {
        specialityService.findAll().then((res) => {
          changeSpecialities(res.data)
        }).then(() => {
          console.log("specialities set")
        })
      }

      if (cities == null || cities.length == 0) {
        cityMasterService.findAll().then((res) => {
          changeCities(res.data)
        })
        .then(() => {
          console.log("cities set")
        })
      }

      changeLocale(language)
      changeLanguage(language)
    }, [])
  )

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const branch = await branchService.findAll();
        setBranchesResp(branch.data);
      } catch (error) {
        console.error("Fetch Branch", error)
      }
    };
    fetchBranch();
  }, []);

  useEffect(() => {
    if (branches) {
      setBranches(branches);
    }
    if (userBranch) {
      setCurrentBranch(userBranch);
    }
  }, [branches, userBranch]);

  return (
    <SafeAreaView className="">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="justify-start my-8 items-start">
          {loggedIn ?
            <Header
              setShowNotification={setShowNotification}
              setShowFavouriteModal={setShowFavouriteModal}
            />
            :
            <View className="py-4 w-full items-center">
              <View className="flex-row justify-between py-2 px-4 bg-[rgb(59,35,20)] rounded-2xl w-4/5 h-[4.5rem]">
                {language === 'en' ?
                  <>
                    <Text className="text-white pt-5 pl-1">{i18n.t("signinmsg")}</Text>
                    <Pressable className="bg-lime-500 p-2 my-2 rounded-lg border-[1px] border-primaryColor" onPress={() => router.push("/SignIn")}>
                      <Text className="text-black font-semibold"> {i18n.t("Sign In")} </Text>
                    </Pressable>
                  </>
                  :
                  <><Pressable className="bg-lime-500 p-2 my-2 rounded-lg border-[1px] border-primaryColor" onPress={() => router.push("/SignIn")}>
                    <Text className="text-black font-semibold"> {i18n.t("Sign In")} </Text>
                  </Pressable>
                    <Text className="text-white pt-5 pl-1">{i18n.t("signinmsg")}</Text></>
                }
              </View>
            </View>
          }
          <UpcomingSlider />
          <DoctorSpeciality />
        </View>

        <NotificationModal
          showNotification={showNotification}
          setShowNotification={setShowNotification}
        />
        {/* <FilterModal showFilter={showFilter} setShowFilter={setShowFilter} /> */}
        <FavouriteModal
          showFavouriteModal={showFavouriteModal}
          setShowFavouriteModal={setShowFavouriteModal}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
