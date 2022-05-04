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
    this.defaultDate = props.defaultDate;
    this.minDateProp = props.minDate;
		this.state={
			PickerValue:'М',
      date: moment().format("YYYY-MM-DD"),
      modalVisible: false,
		}
		
	}

    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
  }
		
  render() {
    const { modalVisible } = this.state;
    var umi ='';//По выбранному городу, маршруту и дате прооисходит формирование ссылки на билеты
    if (this.state.PickerValue==='М'){
        umi ='https://www.culture.ru/afisha/moskva/seanceStartDate-'+this.state.date;
    }
    if (this.state.PickerValue==='П'){
        umi ='https://www.culture.ru/afisha/sankt-peterburg/seanceStartDate-'+this.state.date;
    }
    if (this.state.PickerValue==='К'){
        umi ='https://www.culture.ru/afisha/kazan/seanceStartDate-'+this.state.date;
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
      <Text style={styles.text}>Направление:</Text>
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
    <Text style={styles.text}>Дата:</Text>
    <DatePicker
          style={{width:'80%'}}
          date={this.state.date}
          mode="date"
          format="YYYY-MM-DD"
          minDate={this.minDateProp}
          maxDate={this.defaultDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
          dateText: {
          color: '#2471ab',
          fontSize: 15
          }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
    </View>
      <View style={{width:'90%', marginTop:"8%"}}>
        <Button title="Поиск мероприятий" color="tomato" onPress={() => this.setModalVisible(true)} /> 
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