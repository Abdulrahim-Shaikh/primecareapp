import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../ui/HeaderWithBackButton";
import appointmentService from "../../../domain/services/AppointmentService";
import { useUserSate } from "../../../domain/state/UserState";
import patientService from "../../../domain/services/PatientService";

const sortByOptions = ["All Time", "Last 7 Days", "Last 1 Month", "Last 6 Month"];

type PropsType = {
  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

const NotificationModal = ({ showNotification, setShowNotification }: PropsType) => {
  const [show, setShow] = useState(false);
  const [sortBy, setSortBy] = useState(sortByOptions[0]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  let userId = useUserSate.getState().userId;

  useEffect(() => {
    if (showNotification) {
      const patientId = useUserSate.getState().userId;
      console.log("patientId: ", patientId);
      const branch = useUserSate.getState().branch;
      let branchId;
      setLoading(true);
      patientService
        .getByPatientId(userId) //"PNT000015"
        .then((response) => {
          branchId = response.data.branchId;
        })
        .catch((error) => {
          console.log(error);
        });
      appointmentService
        .getAppointments(userId, branchId) //"PNT000015"
        .then((response) => {
          setNotifications(response.data);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        }).finally(() => {
          setLoading(false);
        });
    }
  }, [showNotification]);

  const formatDate = (dateString: any) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const renderNotification = (notification: any) => {
    const { status, appointmentDate } = notification;
    console.log("Appointment Date: ", appointmentDate);
    if (!appointmentDate || appointmentDate.length !== 3) {
      return (
        <Text className="text-red-500">Date not available</Text>
      );
    }
    const formattedDate = formatDate(new Date(appointmentDate[0], appointmentDate[1] - 1, appointmentDate[2]));
    console.log("Formatted Date: ", formattedDate);

    let notificationMessage;
    switch (status) {
      case 'booked':
        notificationMessage = `Your appointment has been successfully scheduled for ${formattedDate}. Stay healthy!`;
        break;
      // case 'arrived':
      //   notificationMessage = `You have arrived for your appointment on ${formattedDate}.`;
      //   break;
      case 'in-progress':
        notificationMessage = `Your appointment is currently in progress. Stay tuned for updates.`;
        break;
      case 'cancelled':
        notificationMessage = `Your appointment has been cancelled. Please check for other available slots.`;
        break;
      // case 'no-show':
      //   notificationMessage = `You missed your appointment scheduled on ${formattedDate}.`;
      //   break;
      default:
        notificationMessage = `You have a new update regarding your appointment.`;
        break;
    }

    const capitalizeFirstLetter = (string: any) => {
      if (!string) return '';
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
      <View className="pt-5" key={notification.id}>
        <View className="p-4 rounded-2xl border bg-white border-amber-900 flex flex-row justify-start items-center">
          <View>
            <Text className="text-amber-900 p-4 rounded-full bg-amber-100 mr-4">
              {status === 'Cancelled' ? (
                <MaterialCommunityIcons name="close-box" size={24} />
              ) : (
                <FontAwesome name="calendar-check-o" size={24} />
              )}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold">Appointment {capitalizeFirstLetter(status)}</Text>
            <Text className="text-[12px] text-amber-900">{formattedDate}</Text>
            <Text className="text-[12px] text-amber-900">{notificationMessage}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Modal visible={showNotification} animationType="slide">
      <ScrollView>
        <View className="p-6">
          <HeaderWithBackButton setModal={setShowNotification} title="Notification" />

          <View className="pt-8 pb-5 border-b border-dashed border-amber-900 flex flex-row justify-between items-center">
            <Text className="text-lg font-semibold">Latest Update</Text>
            {/* <View className="flex flex-row gap-2 items-center">
              <Text className="text-[12px]">Sort By{":"}</Text>
              <Pressable className="z-50 border border-amber-900 rounded-lg">
                <Text className="px-4 py-2" onPress={() => setShow((prev) => !prev)}>
                  {sortBy} <Feather name="chevron-down" size={18} />
                </Text>
              </Pressable>
            </View> */}
          </View>

          {loading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#ffcc00" />
            </View>
          ) : notifications.length > 0 ? (
            notifications.map(renderNotification)
          ) : (
            <Text className="text-center pt-5">No notifications available.</Text>
          )}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default NotificationModal;

const styles = StyleSheet.create({});
