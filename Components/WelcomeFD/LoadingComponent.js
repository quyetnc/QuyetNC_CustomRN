import React, { Component } from 'react';
import { View, Text,easing, Animated ,Easing} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic'

export default class LoadingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
    this.spinValue = new Animated.Value(0) // khởi tạo giá trị 
  }
    
  componentDidMount () {
    this.spin()
  }
  spin = () => {
    this.spinValue.setValue(0) 
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver : true
      }
    ).start(this.spin)  // gọi lại chính nó khi đã hoàn thành 
  }
  render() {
    const spin = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']  // rotate từ 0 đến 360 độ dựa vào input range 
      })
      return (
        
          <Animated.Image
            style={{ width: Sizes.s50, height: Sizes.s50, transform: [{rotate: spin}] }} // gán giá trị vào đây 
            source={require('../../res/images/icon_loading.png')} />
        
      )
  }
}
