// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Modal,
//   Button,
//   TouchableHighlight,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       language: 'java',
//       modalVisible: false,
//     };
//   }

//   RenderItem = ({item}) => (
//     <TouchableOpacity>
//     <View
//       style={{
//         backgroundColor: 'lightgrey',
//         padding: 20,
//         marginVertical: 6,
//         width: '100%',
//         borderRadius : 10
//       }}>
//       <Text>{item.name}</Text>
//     </View>
//     </TouchableOpacity>
//   );

//   render() {
//     const mockData = [
//       {id: 1, name: 'React Native Developer'},
//       {id: 2, name: 'Android Developer'},
//       {id: 3, name: 'iOS Developer'},
//       {id: 4, name: 'PHP Developer'},
//       {id: 5, name: 'Ruby Developer'},
//       {id: 6, name: 'C# Developer'},
//       {id: 7, name: 'Java Developer'},
//       {id: 8, name: 'Python Developer'},
//     ];
//     var modalBackgroundStyle = {
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     };
//     const {modalVisible} = this.state;
//     return (
//       <View style={[styles.container]}>
//         <Modal
//           animationType="fade"
//           transparent={true}
//           visible={modalVisible}
//           // onRequestClose={() => {
//           //   Alert.alert("Modal has been closed.");
//           // }}
//         >
//           <View style={[styles.centeredView, modalBackgroundStyle]}>
//             <View style={{flex: 1}} />
//           </View>
//         </Modal>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           // onRequestClose={() => {
//           //   Alert.alert("Modal has been closed.");
//           // }}
//         >
//         <TouchableOpacity style = {{flex : 1}}
//             onPress={() => this.setState({modalVisible: !modalVisible})}>
//             <View style={styles.centeredView}>

//               <View style={{flex: 0.6}} />

//               <View style={styles.modalView}>
//                 <FlatList
//                   showsVerticalScrollIndicator = {false}
//                   data={mockData}
//                   keyExtractor={(item, index) => item.id}
//                   renderItem={this.RenderItem}
//                   style={{flex: 1}}
//                 />
//               </View>

//             </View>
//             </TouchableOpacity>
//         </Modal>
//         <Button
//           title="Click"
//           onPress={() => this.setState({modalVisible: !modalVisible})}
//         />
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   centeredView: {
//     flex: 1,
//   },
//   modalView: {
//     flex: 0.4,
//     // margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     justifyContent: 'center',

//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },

//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   openButton: {
//     backgroundColor: '#F194FF',
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import ImagePicker from './Components/ImagePicker';
import PickerScreen from './Components/PickerFD/PickerScreen';
import WelcomeScreen from './Components/WelcomeFD/WelcomeScreen';
import {Sizes} from '@dungdang/react-native-basic';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('PickerScreen')}>
          <Text>ImagePicker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('AnimatedLogo')}>
          <Text>AnimatedLogo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    PickerScreen: {
      screen: PickerScreen,
    },
    AnimatedLogo: {
      screen: WelcomeScreen,
    },
  },
  {
    headerMode: 'none',
  },
);
const styles = StyleSheet.create({
  button: {
    width: '70%',
    padding: Sizes.s20,
    backgroundColor: '#FF9190',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Sizes.s20,
    marginBottom: Sizes.s20,
  },
});
export default createAppContainer(AppNavigator);
