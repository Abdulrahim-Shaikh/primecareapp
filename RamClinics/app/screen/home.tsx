import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.timeText}>12:00</Text>
                <Ionicons name="battery-charging-outline" size={24} color="black" />
            </View>
            <View style={styles.content}>
                <View style={styles.welcomeBox}>
                    <Text style={styles.welcomeText}>Welcome</Text>
                    <Ionicons name="alert-circle-outline" size={24} color="white" />
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>This is your app's home screen.</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Ionicons name="logo-youtube" size={30} color="black" />
                <Ionicons name="logo-instagram" size={30} color="black" />
                <Ionicons name="logo-whatsapp" size={30} color="black" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    timeText: {
        color: 'black',
        fontSize: 18,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    welcomeBox: {
        backgroundColor: 'black',
        width: '100%',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    infoBox: {
        backgroundColor: '#4B5563',
        width: '100%',
        borderRadius: 8,
        padding: 20,
        marginTop: 16,
    },
    infoText: {
        color: 'white',
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 8,
    },
});

export default Home;
