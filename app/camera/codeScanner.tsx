import * as React from 'react'
import { useCallback, useState, useEffect } from 'react'
import { Linking, StyleSheet, View, Pressable } from 'react-native'
import type { Code } from 'react-native-vision-camera'
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera'
import type { CameraPermissionStatus } from 'react-native-vision-camera'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { router, useLocalSearchParams } from 'expo-router';
import { useIsFocused } from '@react-navigation/core'
import { useIsForeground } from '@/hooks/useIsForeground'
import { useNavigationCallback } from '@/hooks/useNavigationHelper';

export default function CodeScannerScreen() {
  const {callbackHandle} = useLocalSearchParams();
  const naviCallback = useNavigationCallback(callbackHandle);

  const [_, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined');
  const device = useCameraDevice('back');
  
  const isFocused = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocused && isForeground;

  const [torch, setTorch] = useState(false);

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setCameraPermissionStatus(permission);
  }, []);

  const onCodeScanned = useCallback((codes: Code[]) => {
    const value = codes[0]?.value;
    naviCallback(value);
    router.back();
  }, [])

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: onCodeScanned,
  })

  return (
    <View style={styles.container}>
      {device != null && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          codeScanner={codeScanner}
          torch={torch ? 'on' : 'off'}
          enableZoomGesture={true}
        />
      )}

      <View style={styles.rightButtonRow}>
        <Pressable style={styles.button} onPress={() => setTorch(!torch)}>
          <IonIcon name={torch ? 'flash' : 'flash-off'} color="white" size={24} />
        </Pressable>
      </View>

      <Pressable style={styles.backButton} onPress={router.back}>
        <IonIcon name="chevron-back" color="white" size={35} />
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  button: {
    marginBottom: 15,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: StaticSafeAreaInsets.safeAreaInsetsRight + 15,
    top: StaticSafeAreaInsets.safeAreaInsetsTop + 15,
  },
  backButton: {
    position: 'absolute',
    left: StaticSafeAreaInsets.safeAreaInsetsLeft + 15,
    top: StaticSafeAreaInsets.safeAreaInsetsTop + 15,
  },
})