import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Picker,Dimensions, Button,Linking,TouchableWithoutFeedback, StyleSheet } from 'react-native';
import RNRestart from 'react-native-restart';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data1, setData1] = useState([]); // Полученные данных по городам
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [selectedValue1, setSelectedValue1] = useState("msk");
  // Получение данных по api сайта
  fetch('https://kudago.com/public-api/v1.4/places/?lang=&location=msk&categories=inn,hostels&page_size=200&fields=id,title,address,phone,description,foreign_url,subway&showing_since='+ Date.now())
      .then((response) => response.json())
      .then((json) => setData1(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  fetch('https://kudago.com/public-api/v1.4/places/?lang=&location=kzn&categories=inn,hostels&page_size=200&fields=id,title,address,phone,description,foreign_url,subway&showing_since='+ Date.now())
      .then((response) => response.json())
      .then((json) => setData2(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  fetch('https://kudago.com/public-api/v1.4/places/?lang=&location=spb&categories=inn,hostels&page_size=200&fields=id,title,address,phone,description,foreign_url,subway&showing_since='+ Date.now())
      .then((response) => response.json())
      .then((json) => setData3(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    // Обновление данных и записать в главную переменную
    if (selectedValue1=='msk'){
      fetch('https://kudago.com/public-api/v1.4/places/?lang=&location=msk&categories=inn,hostels&page_size=200&fields=id,title,address,phone,description,foreign_url,subway&showing_since='+ Date.now())
      .then((response) => response.json())
      .then((json) => setData1(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      var data=data1
  }
    if (selectedValue1=='kzn'){
      fetch('https://kudago.com/public-api/v1.4/places/?lang=&location=kzn&categories=inn,hostels&page_size=200&fields=id,title,address,phone,description,foreign_url,subway&showing_since='+ Date.now())
      .then((response) => response.json())
      .then((json) => setData2(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      data=data2
  }
    if (selectedValue1=='spb'){
      fetch('https://kudago.com/public-api/v1.4/places/?lang=&location=spb&categories=inn,hostels&page_size=200&fields=id,title,address,phone,description,foreign_url,subway&showing_since='+ Date.now())
      .then((response) => response.json())
      .then((json) => setData3(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      data=data3
  }
  // Picer - выпадающий список, котороый позволяет выбрать город для которого производить поиск данных
  // isLoading - процедура загрузки данных
  // FlatList - контейнер для вывода данных
  return (
    <View style={{ flex: 1, alignItems:'center' }}>
      <View style={styles.view1}>
    <Text style={{fontSize: Dimensions.get('window').width/25, marginLeft:"5%",fontWeight: "bold"}}>Город:</Text>
    <Picker
      selectedValue={selectedValue1}
      style={{ width: '81%'}}
      onValueChange={(itemValue, itemIndex) => setSelectedValue1(itemValue)}>
        <Picker.Item label="Москва и Мос. область" value="msk"/>
        <Picker.Item label="Казань" value="kzn"/>
        <Picker.Item label="Санкт-Петербург" value="spb"/>
    </Picker>
    </View>
      {isLoading ? <Text>ПОИСК ОТЕЛЕЙ...</Text> : 
      ( <View style={{ flex: 1, alignItems:'center', width: '90%' }}>
          <FlatList 
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.view2}>
              <Text selectable={true} selectionColor='orange' style={{textAlign:'center', fontWeight: "bold", fontSize:(Dimensions.get('window').width/10*8.1)/18, marginTop:'2%', marginRight:'3%', marginBottom:'2%', marginLeft:'3%',}}>{item.title.toUpperCase()}</Text>
              <Text style={{marginRight:'4%', marginBottom:'1%', marginLeft:'5%', fontSize:(Dimensions.get('window').width/28)}}>{item.description.slice(3,-5)}</Text>
              <Text style={styles.text_st}>Метро: {item.subway}</Text>
              <Text style={styles.text_st}>Адрес: {item.address}</Text>
              <Text selectable={true} style={styles.text_st}>Телефон: {item.phone}</Text>
              <View style={{borderRadius:10, marginBottom:"3%", width:"80%", marginLeft:"10%"}}>
              <Button onPress={() => Linking.openURL(item.foreign_url)} title="Официальный сайт" color='tomato'>
              </Button>
              </View>
              
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  view1:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width:"90%",
    marginTop:'3%',
    borderRadius:10, 
    borderColor: 'black',
    borderWidth: 3, 
    backgroundColor:"#f5f5dc", 
    marginBottom:'3%'
  }, 
  view2:{
    backgroundColor:"#f5f5dc", 
    marginBottom:"3%", 
    borderRadius:10, 
    borderColor: 'black',
    borderWidth: 1,
  },
  text_st:{
    marginRight:'4%', 
    marginBottom:'1%', 
    marginLeft:'5%', 
    fontSize:(Dimensions.get('window').width/28)
  }
})