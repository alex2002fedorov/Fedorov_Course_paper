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
			PickerValue:'М-К',
      date: moment().format("DD.MM.YYYY"),
			PickerValue1:'Поезд',
      modalVisible: false,
		}
		
	}

    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
  }
		
  render() {
    const { modalVisible } = this.state;
    var umi ='https://yandex.ru';//По выбранному городу, маршруту и дате прооисходит формирование ссылки на билеты
    if (this.state.PickerValue1==='Поезд'){
      if (this.state.PickerValue==='М-К'){
        umi ='https://ticket-zhd.ru/kupit-zhd-bilet/#/moskva/kazan?date='+this.state.date;
      }
      if (this.state.PickerValue==='М-П'){
        umi ='https://ticket-zhd.ru/kupit-zhd-bilet/#/moskva/sankt-peterburg?date='+this.state.date;
      }
      if (this.state.PickerValue==='П-К'){
        umi ='https://ticket-zhd.ru/kupit-zhd-bilet/#/sankt-peterburg/kazan?date='+this.state.date;
      }
      if (this.state.PickerValue==='П-М'){
        umi ='https://ticket-zhd.ru/kupit-zhd-bilet/#/sankt-peterburg/moskva?date='+this.state.date;
      }
      if (this.state.PickerValue==='К-М'){
        umi ='https://ticket-zhd.ru/kupit-zhd-bilet/#/kazan/moskva?date='+this.state.date;
      }
      if (this.state.PickerValue==='К-П'){
        umi ='https://ticket-zhd.ru/kupit-zhd-bilet/#/kazan/sankt-peterburg?date='+this.state.date;
      }
    }
    if (this.state.PickerValue1==='Самолет'){
      var dat = this.state.date;
      if (this.state.PickerValue==='М-К'){
        umi ='https://poisk.aviabilet.ru/flights/MOW'+ dat[0]+ dat[1]+ dat[3] + dat[4]+ 'LED1';
      }
      if (this.state.PickerValue==='М-П'){
        umi ='https://poisk.aviabilet.ru/flights/MOW'+ dat[0]+ dat[1]+ dat[3] + dat[4]+'LED1';
      }
      if (this.state.PickerValue==='П-К'){
        umi ='https://poisk.aviabilet.ru/flights/LED'+ dat[0]+ dat[1]+ dat[3] + dat[4]+'KZN1';
      }
      if (this.state.PickerValue==='П-М'){
        umi ='https://poisk.aviabilet.ru/flights/LED'+ dat[0]+ dat[1]+ dat[3] + dat[4]+'MOW1';
      }
      if (this.state.PickerValue==='К-М'){
        umi ='https://poisk.aviabilet.ru/flights/KZN'+ dat[0]+ dat[1]+ dat[3] + dat[4]+'MOW1';
      }
      if (this.state.PickerValue==='К-П'){
        umi ='https://poisk.aviabilet.ru/flights/MOW'+ dat[0]+ dat[1]+ dat[3] + dat[4]+'LED1';
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
      <Text style={styles.text}>Направление:</Text>
      <Picker
        style={{width:'65%'}}
        selectedValue={this.state.PickerValue}
        onValueChange={(itemValue,itemIndex) => this.setState({PickerValue:itemValue})}
        >
        <Picker.Item label="Москва --> Казань" value="М-К"/>
        <Picker.Item label="Москва --> Санкт-Петербург" value="М-П" />
        <Picker.Item label="Санкт-Петербург --> Казань" value="П-К"/>
        <Picker.Item label="Санкт-Петербург --> Москва" value="П-М"/>
        <Picker.Item label="Казань --> Москва" value="К-М"/>
        <Picker.Item label="Казань --> Санкт-Петербург" value="К-П"/>
        </Picker>
    </View>
    <View style={styles.x}>
    <Text style={styles.text}>Дата:</Text>
    <DatePicker
          style={{width:'80%'}}
          date={this.state.date}
          mode="date"
          format="DD.MM.YYYY"
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
    <View style={styles.x}>
    <Text style={styles.text}>Транспорт:</Text>
    <Picker
        style={{width:'70%'}}
        selectedValue={this.state.PickerValue1}
        onValueChange={(itemValue,itemIndex) => this.setState({PickerValue1:itemValue})}
        >
        <Picker.Item label="Поезд" value="Поезд"/>
        <Picker.Item label="Самолет" value="Самолет" />
    </Picker>
    </View>
      <View style={{width:'90%', marginTop:"8%"}}>
        <Button title="Поиск билетов" color="tomato" onPress={() => this.setModalVisible(true)} /> 
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