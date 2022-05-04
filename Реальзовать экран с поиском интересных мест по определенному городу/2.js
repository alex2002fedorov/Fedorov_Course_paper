import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Picker,Dimensions, Button,Linking,TouchableWithoutFeedback , StyleSheet} from 'react-native';
import RNRestart from 'react-native-restart';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data1, setData1] = useState([]);// Полученные данные по Москве
  const [data2, setData2] = useState([]);// Полученные данные по Казани
  const [data3, setData3] = useState([]);// Полученные данные по Санкт-Петербургу
  const [selectedValue1, setSelectedValue1] = useState("msk");
    if (selectedValue1=='msk'){ // Если пользователь выбрал город Москва, про происходит обновление данных и запись их в переменную data, по которой будет проихлдить отрисовка
      fetch('https://kudago.com/public-api/v1.4/places/?lang=ru&page_size=500&fields=id,title,site_url,address,timetable,foreign_url,description&location=msk&categories=attractions,museums,sights,theatre,amusement,bar,anticafe,art-centers,art-space,brewery,bridge,church,clubs,culture,fountain&showing_since='+ Date.now())
      .then((response) => response.json())
      .then((json) => setData1(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      var data=data1
  }
    if (selectedValue1=='kzn'){// Если пользователь выбрал город Москва, про происходит обновление данных и запись их в переменную data, по которой будет проихлдить отрисовка
      fetch('https://kudago.com/public-api/v1.4/places/?lang=ru&page_size=500&fields=id,title,site_url,address,timetable,foreign_url,description&location=kzn&categories=attractions,museums,sights,theatre,amusement,bar,anticafe,art-centers,art-space,brewery,bridge,church,clubs,culture,fountain&showing_since='+ Date.now())
      .then((response) => response.json())
      .then((json) => setData2(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      data=data2
  }
    if (selectedValue1=='spb'){// Если пользователь выбрал город Москва, про происходит обновление данных и запись их в переменную data, по которой будет проихлдить отрисовка
      fetch('https://kudago.com/public-api/v1.4/places/?lang=ru&page_size=500&fields=id,title,site_url,address,timetable,foreign_url,description&location=spb&categories=attractions,museums,sights,theatre,amusement,bar,anticafe,art-centers,art-space,brewery,bridge,church,clubs,culture,fountain&showing_since='+ Date.now())
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
        <Picker.Item label="Москва" value="msk"/>
        <Picker.Item label="Казань" value="kzn"/>
        <Picker.Item label="Санкт-Петербург" value="spb"/>
    </Picker>
    </View>
      {isLoading ? <Text>ПОИСК ИНТЕРЕСНЫХ МЕСТ...</Text> : 
      ( <View style={{ flex: 1, alignItems:'center', width: '90%' }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.view2}>
              <Text selectable={true} selectionColor='orange' style={{textAlign:'center', fontWeight: "bold", fontSize:(Dimensions.get('window').width/10*8.1)/18, marginTop:'2%', marginRight:'2%', marginBottom:'2%', marginLeft:'2%'}}>{item.title.toUpperCase()}</Text>
              <Text style={styles.text_st}>{item.description.slice(3,-5)}</Text>
              <Text style={styles.text_st}><Text style={{fontWeight: "bold"}}>Время работы:</Text> {item.timetable}</Text>
              <Text style={styles.text_st}><Text style={{fontWeight: "bold"}}>Адрес:</Text> {item.address}</Text>
              <View style={{borderRadius:10, marginBottom:"3%", width:"80%", marginLeft:"10%"}}>
              <Button onPress={() => Linking.openURL(item.foreign_url)} title="Официальный сайт" color='tomato'>
              </Button>
              </View>
              <View style={{borderRadius:10, width:"80%", marginBottom:"3%", marginLeft:"10%"}}>
              <Button onPress={() => Linking.openURL(item.site_url)} title="Посмотреть на сайте kudago.com" color='tomato'>
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