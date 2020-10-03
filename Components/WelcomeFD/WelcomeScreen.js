import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LogoComponent from './LogoComponent';
import LoadingComponent from './LoadingComponent';
import DelayComponent from './DelayComponent';
import SpringComponent from './SpringComponent';
import {Sizes} from '@dungdang/react-native-basic';

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LogoComponent />
        <View style={{marginTop: Sizes.s30}}>
          <LoadingComponent />
        </View>
        <View style={{marginTop: Sizes.s50}}>
          <DelayComponent />
        </View>
        <View style={{marginTop: Sizes.s50}}>
          <SpringComponent />
        </View>
      </View>
    );
  }
}
