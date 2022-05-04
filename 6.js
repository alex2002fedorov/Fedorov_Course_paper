import React, { Component, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,Picker, Modal, Dimensions,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import moment from 'moment';

export default class screen1 extends Component<{}> {
	constructor(props){
		super(props);
		this.state={
			PickerValue:'М',
      PickerValue1:'С',
      modalVisible: false,
		}
		
	}

    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
  }
		
  render() {
    const { modalVisible } = this.state;
    var umi ='';//По выбранному городу, маршруту и дате прооисходит формирование ссылки на билеты
    if (this.state.PickerValue1==='С'){
      if (this.state.PickerValue==='М'){
        umi = "https://world-weather.ru/pogoda/russia/moscow/"
      }
      if (this.state.PickerValue==='К'){
        umi = "https://world-weather.ru/pogoda/russia/kazan/"
      }
      if (this.state.PickerValue==='П'){
        umi = "https://world-weather.ru/pogoda/russia/saint_petersburg/"
      }
    }
    if (this.state.PickerValue1==='П'){
      if (this.state.PickerValue==='М'){
        umi = "https://world-weather.ru/pogoda/russia/moscow/24hours/"
      }
      if (this.state.PickerValue==='К'){
        umi = "https://world-weather.ru/pogoda/russia/kazan/24hours/"
      }
      if (this.state.PickerValue==='П'){
        umi = "https://world-weather.ru/pogoda/russia/saint_petersburg/24hours/"
      }
    }
    if (this.state.PickerValue1==='Н'){
      if (this.state.PickerValue==='М'){
        umi = "https://world-weather.ru/pogoda/russia/moscow/7days/"
      }
      if (this.state.PickerValue==='К'){
        umi = "https://world-weather.ru/pogoda/russia/kazan/7days/"
      }
      if (this.state.PickerValue==='П'){
        umi = "https://world-weather.ru/pogoda/russia/saint_petersburg/7days/"
      }
    }
    if (this.state.PickerValue1==='Д'){
      if (this.state.PickerValue==='М'){
        umi = "https://world-weather.ru/pogoda/russia/moscow/14days/"
      }
      if (this.state.PickerValue==='К'){
        umi = "https://world-weather.ru/pogoda/russia/kazan/14days/"
      }
      if (this.state.PickerValue==='П'){
        umi = "https://world-weather.ru/pogoda/russia/saint_petersburg/14days/"
      }
    }
    if (this.state.PickerValue1==='М'){
      if (this.state.PickerValue==='М'){
        umi = "https://world-weather.ru/pogoda/russia/moscow/month/"
      }
      if (this.state.PickerValue==='К'){
        umi = "https://world-weather.ru/pogoda/russia/kazan/month/"
      }
      if (this.state.PickerValue==='П'){
        umi = "https://world-weather.ru/pogoda/russia/saint_petersburg/month/"
      }
    }
    // <Modal visible={modalVisible}> - модальное окно в котором модно посмотреть билеты на поезда и самолеты
    // <View style={styles.x}> - форма заполнения для поиска билетов
    // <Button title="Поиск билетов" - Кнопка по которой происходит получение данных и переход В Модольное окно
    return (
      <View style={styles.container}>
        <Modal visible={modalVisible}>
            <AntDesign name="close" size={30} style={{textAlign: "right",marginRight: "5%",marginBottom: "3%",}} color="black" onPress={() => this.setModalVisible(false)}/>
            <WebView source= {{uri: umi}} />
        </Modal>
      <View style={styles.x}>
        <Text style={styles.text}>Город:</Text>
        <Picker
          style={{width:'65%'}}
          selectedValue={this.state.PickerValue}
          onValueChange={(itemValue,itemIndex) => this.setState({PickerValue:itemValue})}
          >
          <Picker.Item label="Москва" value="М"/>
          <Picker.Item label="Санкт-Петербург" value="П" />
          <Picker.Item label="Казань" value="К"/>
        </Picker>
      </View>
      <View style={styles.x}>
        <Text style={styles.text}>Погода на:</Text>
        <Picker
          style={{width:'65%'}}
          selectedValue={this.state.PickerValue1}
          onValueChange={(itemValue,itemIndex) => this.setState({PickerValue1:itemValue})}
          >
          <Picker.Item label="Сегодня" value="С"/>
          <Picker.Item label="Почасовой" value="П"/>
          <Picker.Item label="Неделя" value="Н"/>
          <Picker.Item label="14 дней" value="Д"/>
          <Picker.Item label="Месяц" value="М"/>
        </Picker>
      </View>
      <View style={{width:'90%', marginTop:"5%"}}>
        <Button title="Поиск данных о погоде" color="tomato" onPress={() => this.setModalVisible(true)} /> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  x:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width:"90%",
    marginTop:'3%',
    borderRadius:10, 
    borderColor: 'black',
    borderWidth: 3, 
    backgroundColor:"#f5f5dc"
  }, 
  text:{
    fontSize: Dimensions.get('window').width/25, 
    marginLeft:"5%",
    fontWeight: "bold"
  }

});