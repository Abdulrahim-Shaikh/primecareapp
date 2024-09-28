import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";

const LegalPolicies = () => {
  return (
    <SafeAreaView className="p-6">
      <HeaderWithBackButton isPushBack={true} title="Legal & Policies" />
      <View className="pt-8">
        <ScrollView>
          <Text className="text-lg font-semibold">Terms</Text>
          <Text className="text-base text-amber-900 pt-2">
            Our Legal and Policies outline the terms and conditions governing
            the use of our services. By accessing or using our platform, you
            agree to abide by these terms, which include but are not limited to,
            user responsibilities, intellectual property rights, privacy
            practices, and dispute resolution procedures. We reserve the right
            to update or modify these terms at any time, and your continued use
            of the platform constitutes acceptance of any changes. Please review
            our Legal and Policies regularly for updates.
          </Text>
          <Text className="text-lg font-semibold pt-8">
            Changes to the Service and/or Terms:
          </Text>
          <Text className="text-base text-amber-900 pt-2">
            Changes to the Service and/or Terms" refers to our commitment to
            continuously improve and update our platform to enhance user
            experience and comply with legal requirements. We reserve the right
            to modify or discontinue any aspect of the service, including
            features, functionalities, and access levels, at any time without
            prior notice. Additionally.
          </Text>
          <Text className="text-base text-amber-900 pt-2">
            we may revise these terms of service to reflect changes in our
            business practices, industry standards, or regulatory obligations.
            Any updates to the terms will be effective immediately upon posting
            on our website or app, and your continued use of the service
            constitutes acceptance of the revised terms.We encourage users to
            review the terms regularly to stay informed about any changes. If
            you do not agree with the updated terms, you may discontinue using
            the service. However, continued use of the service following updates
            indicates your acceptance of the modifications.
          </Text>
          <Text className="text-lg font-semibold pt-8">
            How We Collect Data
          </Text>
          <Text className="text-base text-amber-900 pt-2">
            Our Legal and Policies outline the terms and conditions governing
            the use of our services. By accessing or using our platform, you
            agree to abide by these terms, which include but are not limited to,
            user responsibilities, intellectual property rights, privacy
            practices, and dispute resolution procedures. We reserve the right
            to update or modify these terms at any time, and your continued use
            of the platform constitutes acceptance of any changes. Please review
            our Legal and Policies regularly for updates.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LegalPolicies;

const styles = StyleSheet.create({});
