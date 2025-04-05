import React, {useState, useCallback} from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useNavigationHelper } from '@/hooks/useNavigationHelper';

export default function CameraHome() {
  const [ code, setCode ] = useState('N/A');

  const navigationHelper = useNavigationHelper();
  
  const goCodeScanner = useCallback(() => {
    navigationHelper.navigateWithCallback({
      name: '/camera/codeScanner',
      params: {},
      callback: (s) => {
        console.log('Get qr code: ', s);
        setCode(s);
      }
    });
  }, []);

  return (
    <View style={styles.centeredView}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => router.navigate('/camera/permission')}>
        <Text style={styles.textStyle}>Camera Permission</Text>
      </Pressable>
      <View style={{height: 10}} />
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => router.navigate('/camera/camera')}>
        <Text style={styles.textStyle}>Camera Page</Text>
      </Pressable>
      <View style={{height: 10}} />
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={goCodeScanner}>
        <Text style={styles.textStyle}>Code Scanner Page</Text>
      </Pressable>
      <Text style={{color: 'red'}}>QR Code: {code}</Text>
      <View style={{height: 10}} />
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => router.navigate('/camera/media')}>
        <Text style={styles.textStyle}>Media Page</Text>
      </Pressable>
      <View style={{height: 10}} />
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => router.navigate('/camera/devices')}>
        <Text style={styles.textStyle}>Devices Page</Text>
      </Pressable>
    </View>
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
    width: 200,
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
