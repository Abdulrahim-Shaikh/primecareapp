import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { StyleSheet, Button, FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import branchService from "../../domain/services/BranchService";
import { useCallback, useEffect, useState } from "react";
import logoRamClinic from "../../assets/logo/logo-ram-clinic.png";
import Searchbox from "../../components/ui/Searchbox";
import resourceService from "../../domain/services/ResourceService";
import { Picker } from "@react-native-picker/picker";
import LinkButton from "../../components/LinkButton";
import moment, { Moment } from "moment";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";
import SelectDropdown from "react-native-select-dropdown";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;
const ShiftAndGenderOptions = () => {
    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);

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

    const { city, branch, fromSpeciality, department, speciality, specialityCode, callCenterFlow, devices, responsible, mobileOrOnline } = useLocalSearchParams();
    const [devicesList, setDevicesList] = useState(JSON.parse(devices.toString()));
    const [branches, setBranches] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedShift, setSelectedShift] = useState('Both');
    const [selectedGender, setSelectedGender] = useState('Both');
    const [slotsAvailable, setSlotsAvailable] = useState(new Map<string, Array<number>>())

    useEffect(() => {
        setDevicesList(JSON.parse(devices.toString()))
        setSelectedGender('Both')
        setSelectedShift('Both')
    }, []);

    const shiftOptions: any = [
        { id: 1, name: 'Both' },
        { id: 2, name: 'Morning' },
        { id: 3, name: 'Evening' }
    ]
    const genderOptions: any = [
        { id: 1, name: 'Both' },
        { id: 2, name: 'Male' },
        { id: 3, name: 'Female' }
    ]
    // const shiftOptions: any = [
    //     'Both', 'Morning', 'Evening'];
    // const genderOptions: any = ['Both', 'Male', 'Female'];

    const search = async () => {
        if (+callCenterFlow) {
            router.push({
                pathname: "/SlotsConfirmationPage",
                params: {
                    city: city,
                    branch: branch,
                    fromSpeciality: fromSpeciality,
                    department: department,
                    speciality: speciality,
                    specialityCode: specialityCode,
                    callCenterFlow: callCenterFlow,
                    devices: devices,
                    responsible: responsible,
                    mobileOrOnline: mobileOrOnline,
                    shift: selectedShift,
                    gender: selectedGender,
                    resourceId: -1,
                    callCenterDoctorFlow: 0
                }
            })
        }
        // let subServiceSlotInterval = +mobileOrOnline
        // if (+callCenterFlow) {
        //     let deviceCode: any = ""
        //     for (let device of devicesList) {
        //         deviceCode += device.deviceCode + ","
        //     }

        //     let today = moment().format("YYYY-MM-DD");
        //     let response = await resourceService.getResourceByLiveSlotSpeciality(specialityCode, today, branch, selectedShift, city, deviceCode, responsible)
        //     let slots: any = response.data;
        //     const currentTimeInstance: Moment = moment();
        //     // let doctorsAvailableAgainstSlots: Map<number, Array<any>> = new Map<number, Array<any>>()
        //     let slotsAvailableAux: Map<string, Array<number>> = new Map<string, Array<number>>()
        //     let pastSlotLimit: Map<number, any> = new Map<number, any>()

        //     for (let slot of Object.keys(slots)) {
        //         const slotTimeInstance = moment(`${today} ${slot.trim()}`, "YYYY-MM-DD hh:mm A");
        //         if (slotTimeInstance.isSameOrAfter(currentTimeInstance)) {
        //             let schedules = slots[slot]
        //             if (schedules != null && schedules.length > 0) {
        //                 for (let doctorSchedule of schedules) {
        //                     if (pastSlotLimit.has(doctorSchedule.id)) {
        //                         let upperLimitTimeInstance = pastSlotLimit.get(doctorSchedule.id)
        //                         if (slotTimeInstance.diff(upperLimitTimeInstance, 'minutes') >= subServiceSlotInterval) {
        //                             if (slotsAvailableAux.has(slot)) {
        //                                 slotsAvailableAux.set(slot, [...(slotsAvailableAux.get(slot) || []), doctorSchedule.id])
        //                                 setSlotsAvailable(slotsAvailableAux)
        //                             } else {
        //                                 slotsAvailableAux.set(slot, [doctorSchedule.id])
        //                                 setSlotsAvailable(slotsAvailableAux)
        //                             }
        //                             if (doctorSchedule.status == null || (doctorSchedule.status != null && doctorSchedule.status != 'Busy')) {
        //                                 pastSlotLimit.set(doctorSchedule.id, slotTimeInstance)
        //                                 continue;
        //                             }
        //                         }
        //                         if (doctorSchedule.status != null && doctorSchedule.status == 'Busy') {
        //                             pastSlotLimit.delete(doctorSchedule.id)
        //                         }
        //                     } else {
        //                         if (doctorSchedule.status == null || (doctorSchedule.status != null && doctorSchedule.status != 'Busy')) {
        //                             pastSlotLimit.set(doctorSchedule.id, slotTimeInstance)
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    }

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title={i18n.t("Shift and Doctor Gender")} isPushBack={true} />
                <View className="h-full flex flex-1 flex-col pt-8 space-y-4 ">
                    <View>
                        <Text className="text-base font-medium">Select Shift: </Text>
                        <View className="py-1">
                            <View className="py-4 pl-4 border border-indigo-950 rounded-lg mb-4">
                                <SelectDropdown
                                    data={shiftOptions}
                                    defaultValue={shiftOptions[0]}
                                    onSelect={(selectedItem, index) => {
                                        setSelectedShift(selectedItem)
                                    }}
                                    renderButton={(selectedItem, isOpened) => {
                                        return (
                                            <View>
                                                <Text>
                                                    {(selectedItem && selectedItem.name)}
                                                </Text>
                                            </View>
                                        );
                                    }}
                                    renderItem={(item, index, isSelected) => {
                                        return (
                                            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                                <Text>{item.name}</Text>
                                            </View>
                                        );
                                    }}
                                    dropdownStyle={styles.dropdownMenuStyle}
                                    showsVerticalScrollIndicator={false}
                                />
                                {/* <Picker
                                    selectedValue={selectedShift} onValueChange={(itemValue) => { setSelectedShift(itemValue); }} className="h-12">
                                    <Picker.Item label={i18n.t("Select Shift")} value="" />
                                    {shiftOptions.map((branch: any) => (
                                        <Picker.Item key={branch.id} label={i18n.t(branch.name)} value={branch.name} />
                                    ))}
                                </Picker> */}
                            </View>
                        </View>
                        <Text className="text-base font-medium">Select Gender: </Text>
                        <View className="py-1">
                            <View className="py-4 pl-4 border border-indigo-950 rounded-lg mb-4">
                                <SelectDropdown
                                    data={genderOptions}
                                    defaultValue={genderOptions[0]}
                                    onSelect={(selectedItem, index) => {
                                        setSelectedGender(selectedItem)
                                    }}
                                    renderButton={(selectedItem, isOpened) => {
                                        return (
                                            <View>
                                                <Text>
                                                    {(selectedItem && selectedItem.name)}
                                                </Text>
                                            </View>
                                        );
                                    }}
                                    renderItem={(item, index, isSelected) => {
                                        return (
                                            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                                <Text>{item.name}</Text>
                                            </View>
                                        );
                                    }}
                                    dropdownStyle={styles.dropdownMenuStyle}
                                    showsVerticalScrollIndicator={false}
                                />
                                {/* <Picker
                                    selectedValue={selectedGender} onValueChange={(itemValue) => { setSelectedGender(itemValue); }} className="h-12">
                                    <Picker.Item label={i18n.t("Select Gender")} value="" />
                                    {genderOptions.map((branch: any) => (
                                        <Picker.Item key={branch.id} label={i18n.t(branch.name)} value={branch.name} />
                                    ))}
                                </Picker> */}
                            </View>
                        </View>
                    </View>
                    <View className="pt-4 flex content-center items-center">
                        <TouchableOpacity
                            onPress={() => search()}
                            style={{
                                width: 130,
                                height: 80,
                                backgroundColor: '#3B2314',
                                borderRadius: 130 / 2,
                            }}
                            className="flex flex-row justify-center h-24 items-center gap-4">
                            <Text className="text-xl font-bold text-white">
                                Search
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    search: {
        height: 100,
    },
    dropdownButtonStyle: {
        width: 200,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});
export default ShiftAndGenderOptions;
