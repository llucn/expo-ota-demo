import React, {useState} from 'react';
import { StyleSheet, Modal, View, Text, Pressable, Alert } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { PermissionsPage } from '@/components/PermissionsPage';
import { CameraPage } from '@/components/CameraPage';
import { CodeScannerPage } from '@/components/CodeScannerPage'; 
import { MediaPage } from '@/components/MediaPage';
import { DevicesPage } from '@/components/DevicesPage';

export default function Playground() {
  const [modalPage, setModalPage] = useState(<View key={'empty'} />);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="flask.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Playground</ThemedText>
      </ThemedView>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalPage(<PermissionsPage />)}>
        <Text style={styles.textStyle}>Permissions Page</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalPage(<CameraPage />)}>
        <Text style={styles.textStyle}>Camera Page</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalPage(<CodeScannerPage />)}>
        <Text style={styles.textStyle}>Code Scanner Page</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalPage(<MediaPage />)}>
        <Text style={styles.textStyle}>Media Page</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalPage(<DevicesPage />)}>
        <Text style={styles.textStyle}>Devices Page</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPage.key !== 'empty'}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalPage(<View key={'empty'} />);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            { modalPage }
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalPage(<View key={'empty'} />)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#333333',
  },
  buttonClose: {
    backgroundColor: '#666666',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
