import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import colors from '../constants/colors';
import FWLoading from './FWLoading';

interface Props {
  barStyle?: 'light-content' | 'dark-content';
  children?: any;
  showLoading?: boolean;
  disableAvoidKeyboard?: boolean;
  avoidStatusBar?: boolean;
  barHidden?: boolean;
  enableDismissKeyboard?: boolean;
  titleLoading?: string;
  style?: any;
  statusStyle?: any;
}

const Wrapper = React.memo(
  ({
    barStyle = 'dark-content',
    children,
    showLoading,
    disableAvoidKeyboard = false,
    avoidStatusBar = true,
    barHidden,
    enableDismissKeyboard,
    titleLoading = '',
    style,
    statusStyle,
  }: Props) => {
    return (
      <>
        <SafeAreaView
          style={[{flex: 0, backgroundColor: colors.white}, statusStyle]}
        />
        <SafeAreaView style={[styles.flexFill, style]}>
          <View style={[styles.flexFill]}>
            <KeyboardAvoidingView
              style={[styles.flexFill]}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              enabled={Platform.OS === 'ios' && !disableAvoidKeyboard}>
              <StatusBar
                barStyle={barStyle}
                translucent
                backgroundColor={'transparent'}
                hidden={barHidden}
                {...statusStyle}
              />
              {avoidStatusBar && Platform.OS === 'android' && (
                <View style={[styles.avoidStatusBar, style]} />
              )}
              {(enableDismissKeyboard && (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={styles.flexFill}>{children}</View>
                </TouchableWithoutFeedback>
              )) || <View style={styles.flexFill}>{children}</View>}
            </KeyboardAvoidingView>
            {showLoading && <FWLoading title={titleLoading} />}
          </View>
        </SafeAreaView>
      </>
    );
  },
);

export default Wrapper;

const styles = StyleSheet.create({
  flexFill: {
    flex: 1,
    backgroundColor: colors.white,
  },
  avoidStatusBar: {
    height: getStatusBarHeight(),
  },
  outer: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  outer0: {
    flex: 0,
  },
});
