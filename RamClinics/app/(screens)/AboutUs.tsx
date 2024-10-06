import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderWithBackButton from '../../components/ui/HeaderWithBackButton';
import { AntDesign } from '@expo/vector-icons';

const AboutUs = () => {
    return (
        <SafeAreaView>
            <ScrollView className="bg-gray-100 p-5">
                <View className="bg-gray-100 pb-10">
                <HeaderWithBackButton isPushBack={true} title="About Us" />
                    {/* <Text className="text-3xl font-bold text-center text-teal-600 mb-5 mt-5">About Us</Text> */}
                    <Text className="text-4xl font-bold text-gray-800 mb-5 mt-5">
                        <Text className="text-amber-500">Quality</Text>, <Text className="text-teal-500">Safety</Text>,
                        <Text className="text-amber-500"> Customer Satisfaction</Text>, and Finally <Text className="text-teal-500">Credibility</Text>.
                    </Text>

                    <View className="mb-10 mt-5">
                        <Text className="text-2xl font-bold text-gray-700 mb-2">Our Mission</Text>
                        <Text className="text-lg text-gray-600 mb-2">
                            We at Ram Clinics specialize in medical care and provide <Text className="text-teal-500">high-quality</Text> services under one roof with the latest advanced technologies in all specialties (dental, dermatology, medical).
                        </Text>
                        <Text className="text-lg text-gray-600 mb-2">
                            At Ram Clinics, you will experience <Text className="text-teal-500">unique care</Text> during your treatment because we are pioneers in medical care. We provide a comfortable environment and integrated care, aiming to build bridges of trust with all our clients through education and health education, in addition to credibility.
                        </Text>
                        <Text className="text-lg text-gray-600">
                            We assure our clients that our skills and capabilities will continue to grow as we strive to achieve the highest levels of trust and service for you.
                        </Text>
                    </View>

                    <View className="bg-amber-900 rounded-lg shadow-md p-5 mb-5 mt-5">
                        <View className="flex flex-row items-center">
                            <View className="flex-1 mx-3 text-left">
                                <Text className="text-2xl font-bold text-white">More than</Text>
                                <Text className="text-3xl font-extrabold text-white">30</Text>
                                <Text className="text-2xl font-bold text-white">branches</Text>
                            </View>
                            <Ionicons name="business" size={48} color="white" />
                        </View>
                    </View>

                    <View className="bg-amber-900 rounded-lg shadow-md p-5 mb-5 mt-5">
                        <View className="flex flex-row items-center">
                            <View className="flex-1 mx-3 text-left">
                                <Text className="text-2xl font-bold text-white">More than</Text>
                                <Text className="text-3xl font-extrabold text-white">500</Text>
                                <Text className="text-2xl font-bold text-white">doctors</Text>
                            </View>
                            <Ionicons name="people" size={48} color="white" />
                        </View>
                    </View>

                    <View className="bg-amber-900 rounded-lg shadow-md p-5 mb-5 mt-5">
                        <View className="flex flex-row items-center">
                            <View className="flex-1 mx-3 text-left">
                                <Text className="text-2xl font-bold text-white">More than</Text>
                                <Text className="text-3xl font-extrabold text-white">1,500,000</Text>
                                <Text className="text-2xl font-bold text-white">clients</Text>
                            </View>
                            <Ionicons name="person" size={48} color="white" />
                        </View>
                    </View>

                    <View className="bg-white rounded-lg shadow-md p-5 mb-5 mt-5 border border-gray-300">
                        <View className="flex items-center mb-3">
                            <Ionicons name="eye" size={48} color="#78350F" />
                        </View>
                        <Text className="text-2xl font-bold text-amber-500 text-center mb-2">Vision</Text>
                        <Text className="text-lg text-gray-600 text-center">
                            Leadership in providing medical care services that comply with the highest local and international standards.
                        </Text>
                    </View>

                    <View className="bg-white rounded-lg shadow-md p-5 mb-5 mt-5 border border-gray-300">
                        <View className="flex items-center mb-3">
                            <Ionicons name="chatbubble-ellipses" size={48} color="#78350F" />
                        </View>
                        <Text className="text-2xl font-bold text-amber-500 text-center mb-2">Message</Text>
                        <Text className="text-lg text-gray-600 text-center">
                            Providing <Text className="text-teal-500">high-quality medical services</Text> through qualified staff, advanced technology, and a wide branch network.
                        </Text>
                    </View>

                    <View className="bg-white rounded-lg shadow-md p-5 mb-5 mt-5 border border-gray-300">
                        <View className="flex items-center mb-3">
                            <Ionicons name="star" size={48} color="#78350F" />
                        </View>
                        <Text className="text-2xl font-bold text-amber-500 text-center mb-2">Values</Text>
                        <Text className="text-lg text-gray-600 text-center">
                            <Text className="block">• <Text className="text-teal-500">Quality</Text></Text>
                            <Text className="block">• <Text className="text-teal-500">Safety</Text></Text>
                            <Text className="block">• <Text className="text-teal-500">Teamwork</Text></Text>
                            <Text className="block">• <Text className="text-teal-500">Customer Satisfaction</Text></Text>
                            <Text className="block">• <Text className="text-teal-500">Employee Satisfaction</Text></Text>
                            <Text className="block">• <Text className="text-teal-500">Credibility</Text></Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

export default AboutUs;
