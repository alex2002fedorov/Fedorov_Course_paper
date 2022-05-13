import React, { useState } from "react";
import { View, Text, ScrollView, Button, StyleSheet, Image, Dimensions, TouchableOpacity, Modal, Alert, Pressable} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import Scroll from './components/Scroll';

function fourth_screen({ navigation }) {
    const [Moskva,setMoskva]=useState(false); 
    // константа определяющая открытие закрытие модального окна
    const [Kazan,setKazan]=useState(false); 
    // константа определяющая открытие закрытие модального окна
    const [Piter,setPiter]=useState(false); 
    // константа определяющая открытие закрытие модального окна
  const images1=[
  'https://s1.1zoom.ru/big3/804/Russia_Moscow_Rivers_478099.jpg',
  'https://pic.rutubelist.ru/video/de/d4/ded42483d1547119271018179188efc3.jpg',
  'https://trip-guru.ru/images/easyblog_articles/80/b2ap3_large_rip-guru.ru-0008.jpg',
  "https://discover24.ru/wp-content/uploads/2020/10/xxl.jpg",
  "https://yamoscow.ru/wp-content/uploads/2020/04/Красная-площадь-1280x850.jpg"
  ] 
  // картинки для карусели в модульном окне Москва
  const images2=[
  'https://oppl.ru/up/files/files/novosti/2019-02-08.jpg',
  'https://avatars.mds.yandex.net/get-zen_doc/4776500/pub_602d2d805f462a3bfdb8624e_602d2e37bc490b67257a3c63/scale_1200',
  'https://kipmu.ru/wp-content/uploads/pchspnzptr.jpg',
  'https://avatars.mds.yandex.net/i?id=7b196a5c159305e245d65f086408a82e-5235770-images-thumbs&n=13'
  ] 
  // картинки для карусели в модульном окне Санкт-Петербург
  const images3=[
  'https://i.ytimg.com/vi/t5IHPtoMUe0/maxresdefault.jpg',
  'https://img-fotki.yandex.ru/get/55/30348152.12f/0_64198_be025bf3_orig',
  'http://s4.fotokto.ru/photo/full/343/3435332.jpg'
  ] 
  // картинки для карусели в модульном окне Казань
  // <Modal visible={Moskva}> -  Модальное окно по гор. Москва В котором расположена карусель, название города и описание
  // <Modal visible={Piter}> - Модальное окно по гор. Санкт-Петербург В котором расположена карусель, название города и описание
  // <Modal visible={Kazan}> - Модальное окно по гор. Казань В котором расположена карусель, название города и описание
  // На основном экране расположены 3 фотографии с названиями городов, при нажатии на которые открывается модальое окно с этим городом
    return (
        <ScrollView>
        <Modal visible={Moskva}>
            <View>
              <AntDesign name="close" size={30} style={styles.btn_close} color="black" onPress={() => setMoskva(false)}/>
              <ScrollView>
              <View style={[styles.container, { flexDirection: "column"}]}>
                <View style={{ flex: 1}}>
                  <Text style={styles.naz}>Москва</Text>
                  <Scroll images={images1}/>
                </View>
                <View style={{ flex: 1, marginTop: '4%'}}>
                  <Text style={styles.text_mod}>
                  Москва – столица Российской Федерации. Это крупнейший по численности населения город России, в котором по официальной статистике проживает более 12 млн человек. По этому показателю она входит в десятку самых больших городов мира. Это финансовый, транспортный, логистический, деловой, культурный и туристический центр страны. Здесь сосредоточены важные достопримечательности, среди которых Кремль, Красная площадь, Большой театр, Сталинские высотки и многие другие знаковые объекты.
Москва – город с монументальной архитектурой: понять реальный масштаб широких многополосных улиц, многоярусных развязок и небоскребов можно только с высоты.
                  </Text>
                </View>
              </View>
              </ScrollView>
            </View>
        </Modal>
        <Modal visible={Piter}>
            <View>
              <AntDesign name="close" size={30} style={styles.btn_close} color="black" onPress={() => setPiter(false)}/>
              <ScrollView>
              <View style={[styles.container, { flexDirection: "column"}]}>
                <View style={{ flex: 1}}>
                  <Text style={styles.naz}>Санкт-Петербург</Text>
                  <Scroll images={images2}/>
                </View>
                <View style={{ flex: 1, marginTop: '4%'}}>
                  <Text style={styles.text_mod}>
                  Санкт-Петербург – один из красивейших мегаполисов мира, посмотреть на который приезжают путешественники из разных уголков планеты. Только в 2015 году здесь побывало свыше 3,7 млн российских и 2,8 млн иностранных туристов. Раскинувшийся на побережье Финского залива, в устье реки Невы, Санкт-Петербург является вторым по величине городом России (в статусе самостоятельного субъекта федерации) и одновременно административным центром Ленинградской области и Северо-Западного федерального округа.
                  </Text>
                </View>
              </View>
              </ScrollView>
            </View>
        </Modal>
        <Modal visible={Kazan}>
            <View>
              <AntDesign name="close" size={30} style={styles.btn_close} color="black" onPress={() => setKazan(false)}/>
              <ScrollView>
              <View style={[styles.container, { flexDirection: "column"}]}>
                <View style={{ flex: 1}}>
                  <Text style={styles.naz}>Казань</Text>
                  <Scroll images={images3}/>
                </View>
                <View style={{ flex: 1, marginTop: '4%'}}>
                  <Text style={styles.text_mod}>
                  Казань - один из древнейших городов России, расположенный на Средней Волге на реке Казанка. Является столицей Республики Татарстан и крупнейшим городом Поволжья. Казань - одно из самых красивых и интересных мест России, город с великолепным историческим и культурным наследием. Самой известной достопримечательностью столицы Татарстана является кремль, который включён в список объектов Всемирного наследия ЮНЕСКО.
                  </Text>
                </View>
              </View>
              </ScrollView>
            </View>
        </Modal>
        <View style={[styles.container, { flexDirection: "column"}]}> 
          <View style={{ flex: 1}}>
            <TouchableOpacity onPress={() => setMoskva(true)}>
              <Image style={styles.car1} source={require ('./pictures/1.jpg')}/>
              <Text style={styles.text}>Москва</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginTop: (Dimensions.get('window').height*1.5)/12 }}>
          <TouchableOpacity onPress={() => setKazan(true)}>
            <Image style={styles.car1} source={require ('./pictures/5.jpg')}/>
            <Text style={styles.text}>Казань</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginTop:(Dimensions.get('window').height*1.5)/12 }}>
          <TouchableOpacity onPress={() => setPiter(true)}>
            <Image style={styles.car1} source={require ('./pictures/6.jpg')}/>
            <Text style={styles.text}>Санкт-Петербург</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent:'center',
    alignItems: 'center',
    marginBottom:'13%'
  },
    car1: {
    width: (Dimensions.get('window').width/10*8.1),
    height: (Dimensions.get('window').height/10*2.5),
    borderRadius:10,
  },
  text:{
    fontSize: (Dimensions.get('window').width/10*8.1)/9.5,
    fontWeight: "bold",
    fontFamily: "Gotham Pro",
    color:"white",
    textAlign:"center",
    marginTop: -(Dimensions.get('window').height/10*8.1)/5.5,
  },
  btn_close:{
    textAlign: "right",
    marginRight: "5%",
    marginTop: (Dimensions.get('window').height/10)/12
  }, 
  naz:{
    fontSize: (Dimensions.get('window').width/10*8.1)/9.5, 
    textAlign:"center", 
    fontWeight: "bold"
  },
  text_mod:{
    fontSize: (Dimensions.get('window').width/10*8.1)/16
  }
  
});
export default fourth_screen;