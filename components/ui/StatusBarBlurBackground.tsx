import React from 'react'
import { View, Platform, StyleSheet, ViewProps } from 'react-native'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'

const FALLBACK_COLOR = 'rgba(140, 140, 140, 0.3)'

const StatusBarBlurBackgroundImpl = ({ style, ...props }: ViewProps): React.ReactElement | null => {
  if (Platform.OS !== 'ios') return null

  return (
    <View
      style={[styles.statusBarBackground, style]}
      {...props}
    />
  )
}

export const StatusBarBlurBackground = React.memo(StatusBarBlurBackgroundImpl)

const styles = StyleSheet.create({
  statusBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: StaticSafeAreaInsets.safeAreaInsetsTop,
  },
})