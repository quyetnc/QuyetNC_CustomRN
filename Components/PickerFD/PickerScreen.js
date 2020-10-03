import React, {Component} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import Picker from './Picker';

const DataForPicker = [
  {_id: 1, label: 'Android'},
  {_id: 2, label: 'IOS'},
  {_id: 3, label: 'PHP'},
  {_id: 4, label: 'React Native'},
  {_id: 5, label: 'ReactJS'},
  {_id: 6, label: 'Ruby'},
  {_id: 7, label: 'C#'},
  {_id: 8, label: 'Python'},
];
export default class PickerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemValue: '',
      opacityView: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.opacityView === true ? (
          <View
            style={{
              flex: 1,
              backgroundColor: '#00000036',
              zIndex: 2,
              position: 'absolute',
              height: '100%',
              width: '100%',
            }}
          />
        ) : (
          <View />
        )}

        <View style={{flex: 1, justifyContent: 'center', zIndex: 1}}>
          <Picker
            style={{width: '80%', alignSelf: 'center'}}
            data={DataForPicker} //lable
            noDataMessage="Dữ Liệu Trống"
            placeholder="Chọn giá trị"
            title="Chọn Platform"
            value={this.state.itemValue.label}
            position="flex-end" //flex-end, flex-start, center
            onChangeItem={(item) => this.setState({itemValue: item})}
            setOpacity={() =>
              this.setState({opacityView: !this.state.opacityView})
            }
          />
          <Button
            title="Check Item Selected"
            onPress={() => {
              alert(this.state.itemValue.label);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
