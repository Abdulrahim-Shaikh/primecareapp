import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton"
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import doctorRatingsService from "../../domain/services/DoctorRatingsService";
import { Rating } from "react-native-elements";


const RateDental = () => {
    const { appointmentId, patientName } = useLocalSearchParams();
    const [review, setReview] = useState('');
    const [score, setScore] = useState(5);

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
            Alert.alert("Success", "Ratings Submitted!");
        } catch (error: any) {
            Alert.alert("Failed to submit rating. Please try again.");
        }
    };

    return (
        <View className="flex-1 p-4 bg-white">
            <View className="flex flex-row justify-start items-center gap-4 py-6 mt-4">
                <HeaderWithBackButton title="Rate Dental Doctor" isPushBack={true} />
            </View>
            <TextInput placeholder="Provide Your Review" className="mt-4 p-2 border border-pc-primary"
                value={review}
                onChangeText={setReview}></TextInput>
            <TextInput placeholder="Provide Your Experience" className="mt-4 mb-5 p-2 border border-pc-primary"></TextInput>
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
                <Text className="ml-10 text-lg">{`Score: ${score}`}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-[rgb(59,35,20)] w-2/4 py-2 rounded-lg items-center">
                    <Text className="text-white">Submit Ratings</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default RateDental