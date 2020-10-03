import React, { Component } from 'react';
import { View, Text ,Animated,StyleSheet} from 'react-native';

export default class SpringComponent extends Component {
    constructor () {
        super()
        this.springValue = new Animated.Value(100)
      }
      spring = () => {
        this.springValue.setValue(100)
        Animated.spring(
          this.springValue,
          {
            toValue: 250,
            friction: 1,
            tension: 1,
            useNativeDriver : false,

            // speed: 1,
            // bounciness: 1
          }
        ).start()
      }
      render () {
        return (
          <View style={styles.container}>
            <Text style={{marginBottom: 100}} onPress={this.spring}>Click</Text>
            <Animated.Image
              style={{ width: this.springValue, height: 200, resizeMode: 'stretch' }}
    
              source={require('../../res/images/ic_classroom.png')} />
          </View>
        )
      }
}
const styles = StyleSheet.create({
    container :{
       
    }
})