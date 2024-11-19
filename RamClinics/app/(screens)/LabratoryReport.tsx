import React, { useCallback, useState } from 'react';
import { View, Modal, Pressable, StyleSheet, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import pdfImg from "../../assets/images/pdf.png";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useFocusEffect } from 'expo-router';

interface LabratoryReportProps {
    isVisible: boolean;
    pdfUri: string;
    orderId: string | null;
    onClose: () => void;
}

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;
const LabratoryReport: React.FC<LabratoryReportProps> = ({ isVisible, pdfUri, orderId, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [locale, setLocale] = useState(i18n.locale);
    const { language, changeLanguage } = useLanguage();

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

    return (
        <Modal visible={isVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <Text style={styles.invoiceIdText}>Order ID: {orderId}</Text>
                {loading && <ActivityIndicator size="large" color="#007BFF" />}
                {error && <Text style={styles.errorText}>{i18n.t('Failed to load PDF. Please try again')}.</Text>}
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
                    <Text style={styles.closeButtonText}>{i18n.t('Close')}</Text>
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

export default LabratoryReport;
function changeLanguage(language: any) {
    throw new Error('Function not implemented.');
}

