import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {fontSize} from '../constants';
import colors from '../constants/colors';
import {setValue} from '../utils/utils';
import Text from './Text';

type Props = {
  wrapStyle?: any;
  color?: any;
  size?: 'small' | 'large';
  title?: string;
};

const FWLoading = ({
  wrapStyle = {},
  color = colors.white,
  size = 'small',
  title = '',
}: Props) => (
  <View style={[styles.wrap, wrapStyle]}>
    {title ? (
      <>
        <View style={styles.box1}>
          <ActivityIndicator color={colors.black} size={size} />
        </View>
        <Text style={styles.txt}>Securely logging you out</Text>
      </>
    ) : (
      <View style={styles.box}>
        <ActivityIndicator color={color} size={size} />
      </View>
    )}
  </View>
);
export default FWLoading;
const styles = StyleSheet.create({
  container: {},
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    ...StyleSheet.absoluteFillObject,
  },
  box: {
    borderRadius: setValue(5),
    width: setValue(72),
    height: setValue(64),
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box1: {
    borderRadius: setValue(5),
    width: setValue(72),
    height: setValue(64),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: fontSize.h4,
    color: colors.black,
  },
});
