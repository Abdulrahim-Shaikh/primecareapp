import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import branchService from "../../domain/services/BranchService";

const Offers = () => {
    // const [branches, setBranches] = useState<{ label: string; value: string; }[]>([]);
    // const [selectedBranch, setSelectedBranch] = useState('');
    const branches = [
        { label: 'Branch', value: 'branch' },
        { label: 'Branch 2', value: 'branch2' },
        { label: 'Branch 3', value: 'branch3' },
    ];

    const offers = [
        {
            id: 1,
            branch: 'branch',
            title: 'INFINI/SCARLET/INTRACELL SESSION FOR FACE',
            description: 'EID Al Adha Offers',
            imageUrl: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            branch: 'branch2',
            title: 'Summer Special Package',
            description: 'SKIN REJUVENATION',
            imageUrl: 'https://via.placeholder.com/150',
        },
    ];

    // useEffect(() => {
    //     branchService.findAll().then((res) => {
    //         setBranches(res.data);
    //     });
    // });

    const [selectedBranch, setSelectedBranch] = useState('branch');
    const filteredOffers = offers.filter((offer) => offer.branch === selectedBranch);

    return (
        <View className="flex-1 bg-white p-4">
            <View className="flex-row justify-between items-center mb-4 mt-8">
                <Text className="text-2xl font-bold">Offers</Text>
                <View className="border border-gray-400 rounded-lg p-1 w-1/2">
                    <Picker
                        selectedValue={selectedBranch}
                        onValueChange={(itemValue) => setSelectedBranch(itemValue)}
                        style={{ height: 40 }}>
                        {branches.map((branch) => (
                            <Picker.Item key={branch.value} label={branch.label} value={branch.value} />
                        ))}
                    </Picker>
                </View>
            </View>

            <FlatList data={filteredOffers} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
                <View className="flex-row border border-gray-300 rounded-lg mb-4 overflow-hidden">
                    <Image source={{ uri: item.imageUrl }} className="w-32 h-32" />
                    <View className="flex-1 p-4">
                        <Text className="text-base font-bold mb-1">{item.title}</Text>
                        <Text className="text-sm text-gray-500 mb-4">{item.description}</Text>
                        <Pressable className="bg-teal-800 flex-row items-center justify-center rounded-md py-2">
                            <FontAwesome name="calendar" size={16} color="white" className="mr-2" />
                            <Text className="text-white font-bold">Book</Text>
                        </Pressable>
                    </View>
                </View>
            )}
            />
        </View>
    );
};

export default Offers;