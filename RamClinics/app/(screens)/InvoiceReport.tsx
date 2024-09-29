import React from 'react';
import { View, Modal, Pressable, StyleSheet, Text, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import pdfImg from "../../assets/images/pdf.png";

interface InvoiceReportProps {
    isVisible: boolean;
    pdfUri: string;
    invoiceId: string | null;
    onClose: () => void;
}

const InvoiceReport: React.FC<InvoiceReportProps> = ({ isVisible, pdfUri, invoiceId, onClose }) => {
    console.log("InvoiceReport Props:", { isVisible, pdfUri, invoiceId });
    return (
        <Modal visible={isVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <Text style={styles.invoiceIdText}>Invoice ID: {invoiceId}</Text>
                <Text style={styles.downloadingText}>Downloading...</Text>
                <Image source={pdfImg} style={styles.image} />
                <WebView
                    source={{ uri: pdfUri }}
                    style={styles.webView}
                    javaScriptEnabled={true}
                    scalesPageToFit={true}
                    onLoadStart={() => console.log("Loading started...")}
                    onLoadEnd={() => console.log("Loading ended...")}
                    onHttpError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.error('HTTP error: ', nativeEvent);
                    }}
                    onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.error('Error: ', nativeEvent);
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
    downloadingText: {
        fontSize: 14,
        color: 'gray',
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
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
});

export default InvoiceReport;
