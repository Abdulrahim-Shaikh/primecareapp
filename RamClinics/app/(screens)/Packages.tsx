import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import branchService from "../../domain/services/BranchService";

const Packages = () => {
    // const [branches, setBranches] = useState<{ label: string; value: string; }[]>([]);
    // const [selectedBranch, setSelectedBranch] = useState('');
    const branches = [
        { label: 'Branch', value: 'branch' },
        { label: 'Branch 2', value: 'branch2' },
        { label: 'Branch 3', value: 'branch3' },
    ];

    const packages = [
        {
            id: 1,
            branch: 'branch',
            packageName: 'EID Al Adha Package',
            serviceName: 'STEM CELLS FOR HAIR',
            imageUrl: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            branch: 'branch2',
            packageName: 'Summer Special Package',
            serviceName: 'SKIN REJUVENATION',
            imageUrl: 'https://via.placeholder.com/150',
        },
    ]

    const [selectedBranch, setSelectedBranch] = useState('branch');

    const filteredPackages = packages.filter((pack) => pack.branch === selectedBranch);

    return (
        <View className="flex-1 bg-white p-4">
            <View className="flex-row justify-between items-center mb-4 mt-8">
                <Text className="text-2xl font-bold">Packages</Text>
                <View className="border border-gray-400 rounded-lg p-1 w-1/2">
                    <Picker
                        selectedValue={selectedBranch} onValueChange={(itemValue) => setSelectedBranch(itemValue)}
                        style={{ height: 40 }}>
                        {branches.map((branch) => (
                            <Picker.Item key={branch.value} label={branch.label} value={branch.value} />
                        ))}
                    </Picker>
                </View>
            </View>

            <FlatList data={filteredPackages} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
                <View className="flex-row border border-gray-300 rounded-lg mb-4 overflow-hidden">
                    <Image source={{ uri: item.imageUrl }} className="w-32 h-32" />
                    <View className="flex-1 p-4">
                        <Text className="text-base font-bold mb-1">{item.packageName}</Text>
                        <Text className="text-sm text-gray-500 mb-4">{item.serviceName}</Text>
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

export default Packages;