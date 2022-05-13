import * as React from 'react'
import { Button, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import Ionicons from 'react-native-vector-icons/Ionicons';
// Экраны
import first_screen from './1';
import second_screen from './2';
import third_screen from './3';
import fourth_screen from './4';
import five_screen from './5';
import six_screen from './6';
import seven_screen from './7';

//Название навбара
const City = "Города";
const Weather = "Погода";
const Place = "Интересные места";
const Plane = "Заметки";
const Tickets = "Билеты";
const Hotels = 'Отели';
const Events = "Афиша"

const Drawer = createDrawerNavigator()
 // Drawer - боковое меню для выбора экранов
const App = () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="City" screenOptions={{
        drawerActiveBackgroundColor: "tomato",
        drawerActiveTintColor:"white",
        drawerInactiveTintColor:"black"
        
      }}>
      <Drawer.Screen name={City} component={first_screen}/>
      <Drawer.Screen name={Weather} component={six_screen} />
      <Drawer.Screen name={Hotels} component={five_screen} />
      <Drawer.Screen name={Tickets} component={fourth_screen} />
      <Drawer.Screen name={Place} component={second_screen} />
      <Drawer.Screen name={Events} component={seven_screen}/>
      <Drawer.Screen name={Plane} component={third_screen} />
    </Drawer.Navigator>
  </NavigationContainer>
)

export default App