import React, { useState } from 'react';
import { View, Modal, Pressable, StyleSheet, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import pdfImg from "../../assets/images/pdf.png";

interface RadialogyReportProps {
    isVisible: boolean;
    pdfUri: string;
    orderId: string | null;
    onClose: () => void;
}

const RadialogyReport: React.FC<RadialogyReportProps> = ({ isVisible, pdfUri, orderId, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    console.log("RadialogyReport Props:", { isVisible, pdfUri, orderId });

    return (
         <Modal visible={isVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <Text style={styles.invoiceIdText}>Order ID: {orderId}</Text>
                {loading && <ActivityIndicator size="large" color="#007BFF" />}
                {error && <Text style={styles.errorText}>Failed to load PDF. Please try again.</Text>}
                <Image style={styles.image} source={pdfImg} />
                <WebView
                    source={{ uri: pdfUri }}
                    style={styles.webView}
                    javaScriptEnabled={true}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                    onHttpError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.error('HTTP error: ', nativeEvent);
                        setError(true);
                    }}
                    onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.error('Error: ', nativeEvent);
                        setError(true);
                    }}
                />
                <Pressable onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
            </View>
         </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    invoiceIdText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    webView: {
        width: '100%',
        height: '70%',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginTop: 4,
    },
});

export default RadialogyReport;
