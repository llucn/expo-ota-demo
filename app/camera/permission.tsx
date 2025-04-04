import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, Linking, Pressable, StyleSheet } from 'react-native';
import type { CameraPermissionStatus } from 'react-native-vision-camera'
import { Camera } from 'react-native-vision-camera'

export default function PermissionScreen() {
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined')
  const [microphonePermissionStatus, setMicrophonePermissionStatus] = useState<CameraPermissionStatus>('not-determined')

  const requestMicrophonePermission = useCallback(async () => {
    console.log('Requesting microphone permission...')
    const permission = await Camera.requestMicrophonePermission()
    console.log(`Microphone permission status: ${permission}`)

    if (permission === 'denied') await Linking.openSettings()
    setMicrophonePermissionStatus(permission)
  }, [])

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...')
    const permission = await Camera.requestCameraPermission()
    console.log(`Camera permission status: ${permission}`)

    if (permission === 'denied') await Linking.openSettings()
    setCameraPermissionStatus(permission)
  }, [])

  // useEffect(() => {
  //   setCameraPermissionStatus(Camera.getCameraPermissionStatus);
  //   setMicrophonePermissionStatus(Camera.getMicrophonePermissionStatus);
  // }, [])

  return (
    <View style={styles.modalView}>
      <Text style={styles.textStyle}>Vision Camera needs Camera permission</Text>
      {cameraPermissionStatus !== 'granted' && (
        <View>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={requestCameraPermission}
          >
            <Text style={styles.textStyle}>Grant</Text>
          </Pressable>
        </View>
      )}
      <View style={{height: 50}} />
      <Text style={styles.textStyle}>Vision Camera needs Microphone permission</Text>
      {microphonePermissionStatus !== 'granted' && (
        <View>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={requestMicrophonePermission}
          >
            <Text style={styles.textStyle}>Grant</Text>
          </Pressable>
        </View>
      )}
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
    margin: 10,
    backgroundColor: '#606060',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
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
