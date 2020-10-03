import React, {Component} from 'react';
import {View, Text, Animated, TouchableOpacity} from 'react-native';

export default class DelayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.anim = new Animated.ValueXY();
  }
  onAction = () => {
    Animated.decay(this.anim, {
      velocity: {x: 1, y: 50},
      deceleration: 0.2,
      useNativeDriver: false,
    }).start();
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.onAction}
        style={{backgroundColor: 'red', width: 100}}>
        <Animated.Text style={this.anim.getLayout()}>
          Click here to start animation
        </Animated.Text>
      </TouchableOpacity>
    );
  }
}
