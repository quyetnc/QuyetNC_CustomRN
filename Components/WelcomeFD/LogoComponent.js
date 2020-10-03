import React, {Component} from 'react';
import {Button, View, Text, Image, Animated, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';

export default class LogoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: new Animated.Value(0),
    };
  }

  componentDidMount(props) {
    this.AnimatedFun();
  }
  AnimatedFun = () => {
    Animated.sequence([
      Animated.timing(this.state.animating, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.animating, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => this.AnimatedFun());
  };
  render() {
    return (
      <Animated.View
        {...this.props.style}
        style={{...this.props.style, opacity: this.state.animating}}>
        {/* {this.props.children} */}
        <Image source={require('../../res/images/ic_rmis.png')} />
      </Animated.View>
    );
  }
}
// export default class WelcomeScreen extends Component {
//   render() {
//     return (
//       <SafeAreaView style={{flex: 1}}>
//         {/* <View style={{flex: 1}}>
//           <LogoAnimation style={{flex: 1,    justifyContent: 'center',    alignItems: 'center',    backgroundColor: '#eee',}}>
//             <Image
//               source={require('../../img/logo_fpt.png')}
//               style={{ height: 100, width: 200}}
//             />
//           </LogoAnimation>
//         </View> */}
//         <Text>dsfsdfsd</Text>
//       </SafeAreaView>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  image: {
    height: 100,
    width: 200,
  },
});
