import React from 'react';
import {StyleSheet, Text as RNText, TextProps} from 'react-native';
import {fontSize} from '../constants';
import colors from '../constants/colors';

export const Text: React.FC<TextProps> = props => {
  return (
    <RNText style={[styles.container, props.style]} {...props}>
      {props.children}
    </RNText>
  );
};
export default Text;

const styles = StyleSheet.create({
  container: {
    color: colors.black,
    fontSize: fontSize.h4,
  },
});
