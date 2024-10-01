import { useCallback, useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Button, Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import PdfRendererView from 'react-native-pdf-renderer';

type PdfViewerProps ={
    url: string;
    invoiceId: string;
}

// const PdfViewer = ( {url}: PdfViewerProps) => {
//   const handlePress = async () => {
//     const supported = await Linking.canOpenURL(url);

//     if (supported) {
//       await Linking.openURL(url);
//     } else {
//       console.log(`Don't know how to open this URL: ${url}`);
//     }
//   };

//   return <Button title="Download PDF" onPress={handlePress} />;
// };

const PdfViewer = ( {url, invoiceId}: PdfViewerProps) => {
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [downloading, setDownloading] = useState(false);
    const [singlePage, setSinglePage] = useState(true);
    const [toggle, setToggle] = useState(true);
    const [source, setSource] = useState<string>();
  
    const downloadWithExpoFileSystem = useCallback(async () => {
        try {
          setDownloading(true);          
          const response = await FileSystem.downloadAsync(
            url,
            FileSystem.documentDirectory + invoiceId + '.pdf',
          );          
          setSource(response.uri);
        } catch (err) {
          console.warn(err);
        } finally {
          setDownloading(false);
        }
      }, []);

      useEffect(() => {
        downloadWithExpoFileSystem();
        // downloadWithBlobUtil();
      }, [downloadWithExpoFileSystem]);


      const renderPdfView = () => {
        if (downloading) {
          return <Text>Downloading...</Text>;
        }
    
        if (!toggle) {
          return <Text>Unmounted</Text>;
        }
    
        return (
          <>
            <Button title="Single Page" onPress={() => setSinglePage(prev => !prev)} />
            <SafeAreaView style={style.container}>
            <PdfRendererView style={style.pdf}
            //   style={{backgroundColor: 'red'}}
              source={source}
              distanceBetweenPages={16}
              maxZoom={20}
              maxPageResolution={2048}
              singlePage={singlePage}
            //   onPageChange={(current, total) => {
            //     console.log('onPageChange', {current, total});
            //     setCurrentPage(current);
            //     setTotalPages(total);
            //   }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 16,
                left: 0,
                right: 0,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  color: 'black',
                  padding: 4,
                  borderRadius: 4,
                }}>
                {currentPage + 1}/{totalPages}
              </Text>
            </View>
            </SafeAreaView>
          </>
        );
      };
    
      return (
        <SafeAreaView style={{flex: 1}}>
          <StatusBar translucent={false} />
    
          {/* <Button title="Mount/Unmount" onPress={() => setToggle(prev => !prev)} /> */}
    
          {renderPdfView()}
        </SafeAreaView>
      );

};
export default PdfViewer;

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    pdf: {
        flex:1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
})