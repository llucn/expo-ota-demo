import * as React from 'react'
import { useCallback, useRef, useState } from 'react'
import type { AlertButton } from 'react-native'
import { Alert, Linking, StyleSheet, View, Pressable } from 'react-native'
import type { Code } from 'react-native-vision-camera'
import { useCameraDevice, useCodeScanner } from 'react-native-vision-camera'
import { Camera } from 'react-native-vision-camera'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router';
import { useIsFocused } from '@react-navigation/core'
import { useIsForeground } from '@/hooks/useIsForeground'
import { StatusBarBlurBackground } from '@/components/ui/StatusBarBlurBackground'

const showCodeAlert = (value: string, onDismissed: () => void): void => {
  const buttons: AlertButton[] = [
    {
      text: 'Close',
      style: 'cancel',
      onPress: onDismissed,
    },
  ]
  if (value.startsWith('http')) {
    buttons.push({
      text: 'Open URL',
      onPress: () => {
        Linking.openURL(value)
        onDismissed()
      },
    })
  }
  Alert.alert('Scanned Code', value, buttons)
}

export default function CodeScannerScreen() {
  const device = useCameraDevice('back')
  
  const isFocused = useIsFocused()
  const isForeground = useIsForeground()
  const isActive = isFocused && isForeground

  const [torch, setTorch] = useState(false)

  const isShowingAlert = useRef(false)

  const onCodeScanned = useCallback((codes: Code[]) => {
    console.log(`Scanned ${codes.length} codes:`, codes)
    const value = codes[0]?.value
    if (value == null) return
    if (isShowingAlert.current) return
    showCodeAlert(value, () => {
      isShowingAlert.current = false
    })
    isShowingAlert.current = true
  }, [])

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

      <StatusBarBlurBackground />

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