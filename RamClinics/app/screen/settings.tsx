import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Settings = () => {
    const [inputValue, setInputValue] = React.useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Settings Page</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your settings"
                value={inputValue}
                onChangeText={setInputValue}
            />
            <View style={styles.logoContainer}>
                <Ionicons name="bluetooth-outline" size={24} color="black" />
                <Text style={styles.logoText}>Bluetooth</Text>
            </View>
            <View style={styles.logoContainer}>
                <Ionicons name="call-outline" size={24} color="black" />
                <Text style={styles.logoText}>Call</Text>
            </View>
            <View style={styles.logoContainer}>
                <Ionicons name="finger-print-outline" size={24} color="black" />
                <Text style={styles.logoText}>Finger Print</Text>
            </View>
            <View style={styles.logoContainer}>
                <Ionicons name="images-outline" size={24} color="black" />
                <Text style={styles.logoText}>Images</Text>
            </View>
            <View style={styles.logoContainer}>
                <Ionicons name="language-outline" size={24} color="black" />
                <Text style={styles.logoText}>Language</Text>
            </View>
            <View style={styles.logoContainer}>
                <Ionicons name="lock-open-outline" size={24} color="black" />
                <Text style={styles.logoText}>Lock-Screen</Text>
            </View>
            <View style={styles.logoContainer}>
                <Ionicons name="radio-outline" size={24} color="black" />
                <Text style={styles.logoText}>Radio</Text>
            </View>
            <View style={styles.logoContainer}>
                <Ionicons name="logo-instagram" size={24} color="black" />
                <Text style={styles.logoText}>Instagram</Text>
            </View>
            <View style={styles.logoContainer}>
                <Ionicons name="logo-youtube" size={24} color="black" />
                <Text style={styles.logoText}>Youtube</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 16,
    },
    text: {
        fontSize: 24,
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        paddingHorizontal: 8,
        borderRadius: 5,
        marginBottom: 16,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    logoText: {
        marginLeft: 16,
        fontSize: 16,
    },
});

export default Settings;
