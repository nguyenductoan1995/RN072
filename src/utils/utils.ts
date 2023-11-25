import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const pivotWidth = 375; //width off screen in design
const pivotHeight = 812; //Height off screen in design

export const setValue = (value: number) => {
  const ratio = (height * width) / (pivotHeight * pivotWidth);
  return ratio === 1 ? value : value * ratio;
};
