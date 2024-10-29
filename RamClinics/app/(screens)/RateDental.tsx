import { Alert, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native"
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton"
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import doctorRatingsService from "../../domain/services/DoctorRatingsService";
import { Rating } from "react-native-elements";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const RateDental = () => {
    const { appointmentId, patientName } = useLocalSearchParams();
    const [review, setReview] = useState('');
    const [score, setScore] = useState(5);
    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [ratingSubmissionFailed, setRatingSubmissionFailed] = useState(false);

    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }

    useFocusEffect(
        useCallback(() => {
            changeLocale(language)
            changeLanguage(language)
        }, [])
    )

    const handleRating = (rating: number) => {
        setScore(rating);
    };

    const handleSubmit = async () => {
        let ratingData = {
            appointmentId: appointmentId,
            bookedOn: Date.now(),
            appointmentDate: Date.now(),
            consultantName: patientName,
            score: score,
            review: review,
            reviewedDate: Date.now(),
        };
        try {
            await doctorRatingsService.save(ratingData);
            setSuccessModalVisible(true);
        } catch (error: any) {
            setRatingSubmissionFailed(true)
        }
    };

    return (
        <View className="flex-1 p-4 bg-white">
            <View className="flex flex-row justify-start items-center gap-4 py-6 mt-4">
                <HeaderWithBackButton title={i18n.t("Rate Dental Doctor")} isPushBack={true} />
            </View>
            <TextInput placeholder={i18n.t("Provide Your Review")} className="mt-4 p-2 border border-pc-primary"
                value={review}
                onChangeText={setReview}></TextInput>
            <TextInput placeholder={i18n.t("Provide Your Experience")} className="mt-4 mb-5 p-2 border border-pc-primary"></TextInput>
            <View className="flex flex-row items-center mt-4 mb-5">
                <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={35}
                    startingValue={score}
                    onFinishRating={handleRating}
                    tintColor="white"
                    ratingColor="#78450f"
                    ratingBackgroundColor="#d3d3d3"
                />
                <Text className="ml-10 text-lg">{`${i18n.t("Score")}: ${score}`}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-[rgb(59,35,20)] w-2/4 py-2 rounded-lg items-center">
                    <Text className="text-white">{i18n.t("Submit Ratings")}</Text>
                </TouchableOpacity>
            </View>
            <Modal transparent={true} animationType="fade" visible={ratingSubmissionFailed} onRequestClose={() => setRatingSubmissionFailed(false)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View className="bg-white p-6 rounded-lg w-4/5 relative">
                        <View className="flex flex-row justify-center">
                            <MaterialCommunityIcons
                                name="close-circle-outline"
                                size={60}
                                color={"#EF4444"}
                            />
                        </View>
                        <Text className="text-xl font-bold text-center mb-4 pt-3">Failed to submit rating. Please try again</Text>
                        <View className=" flex-row justify-end gap-5 items-center py-4">
                            <Pressable onPress={() => {
                                setRatingSubmissionFailed(false)
                            }}>
                                <Text> Ok </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal transparent={true} animationType="fade" visible={successModalVisible} onRequestClose={() => setSuccessModalVisible(false)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View className="bg-white p-6 rounded-lg w-4/5 relative">
                        <View className="flex flex-row justify-center">
                            <MaterialCommunityIcons
                                name="check-circle-outline"
                                size={60}
                                color={"#84CC16"}
                            />
                        </View>
                        <Text className="text-xl font-bold text-center mb-4 pt-3">Success - Ratings Submitted!</Text>
                        <View className=" flex-row justify-between gap-5 items-center py-4">
                            <Pressable onPress={() => {
                                setSuccessModalVisible(false)
                            }} >
                                <Text> Back </Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                setSuccessModalVisible(false)
                            }}>
                                <Text> Ok </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
export default RateDental