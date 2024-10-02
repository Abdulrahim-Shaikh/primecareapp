import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native"
import { useUserSate } from "../../domain/state/UserState";
import promotionOrderService from "../../domain/services/PromotionOrderService";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MyPromotionBookings = () => {
    const [promotionOrders, setPromotionOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    let patientId = useUserSate.getState().userId;
    let patientName = useUserSate.getState().patientName;

    useEffect(() => {
        promotionOrderService.byPatientId(patientId)
            .then((res) => {
                setPromotionOrders(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [patientId]);

    return (
        <View className="flex-1 p-4 bg-white">
            <View className="flex flex-row justify-start items-center gap-4 py-6">
                <HeaderWithBackButton isPushBack={true} title=" My Promotion Bookings" />
            </View>

            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#78450f" />
                </View>
            ) : (
                promotionOrders.length > 0 ? (
                    <FlatList
                        data={promotionOrders}
                        keyExtractor={(item: any) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View className="flex-row border border-amber-900 rounded-lg mb-4 p-4 bg-white shadow-md">
                                <View className="flex-1">
                                    <Text className="text-base font-bold mb-1">
                                        {item.promotionName}
                                    </Text>
                                    <Text className="text-sm" style={{ color: '#04522b', fontWeight: '600' }}>
                                        Amount: {item.amount.toFixed(2)}
                                    </Text>
                                </View>
                                <Text className="text-sm self-center" style={{ color: '#78450f', fontWeight: '500' }}>
                                    {new Date(item.orderDate).toLocaleDateString()}
                                </Text>
                            </View>
                        )}
                    />
                ) : (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-gray-500 text-lg text-center">
                            No Bookings found!
                        </Text>
                    </View>
                )
            )}
        </View>
    );
}

export default MyPromotionBookings;