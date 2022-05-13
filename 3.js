import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Modal, Picker, TextInput, Button, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { AsyncStorage } from 'react-native';

const STORAGE_KEY = '@save_task'

function second_screen({ navigation }) {
  const [plan,setplan]=useState(false);
  const [selectedValue, setSelectedValue] = useState("Москва");
  const [selectedValue1, setSelectedValue1] = useState("Казань");
  const [date, setDate] = useState(moment().format("DD.MM.YYYY"))
  const [date1, setDate1] = useState(moment().add(1,'days').format("DD.MM.YYYY"));
  const [task1, setTask1] = useState("");
  const [num, setnum] = useState(0);
  const [taskList, setTaskList] = useState([]);
  
  const addTask = () => {
      if (date<date1){
        setTaskList([...taskList, [selectedValue,selectedValue1,date,date1,task1]]);
        setplan(false);
        setSelectedValue("Москва");
        setSelectedValue1("Казань");
        setDate(moment().format("DD.MM.YYYY"));
        setDate1(moment().add(1,'days').format("DD.MM.YYYY"));
        setTask1("");
      }
      else{
          Alert.alert("Ошибка", "Дата отправления позже Даты прибытия");
      }
  };

  const completeTask = (index) => { // По индексу в списке заметок осуществляем возможность убирать заметку
    if (taskList.length>1){
        let listCopy = [...taskList]; // Записываем список заметок в новую переменную
        listCopy.splice(index, 1); // Меняем расположение заметки в списке
        setTaskList(listCopy); // Перезаписываем
    }
    else{
      setTaskList([]);
      remove();
    }
    
  };

  const save = async() => { // Сохранение задач с помощью AsyncStorage
    try {
      await AsyncStorage.setItem("@save_task", JSON.stringify(taskList)); // JSON.stringfy конвертирует значения и объекты в строку формата JSON
    } catch(err) {
      alert(err);
    }
  };

    const load = async () => { // Загрузка задач с помощью AsyncStorage
    try {
       let taskList = await AsyncStorage.getItem("@save_task") // getItem() - получение данных из хранилища
       if (taskList !== null) {
         setTaskList(JSON.parse(taskList)); // JSON.parse преобразовывает JSON обратно в объект
       }
    } catch(err) {
      alert(err)
    }
  };
  const press = () => { // Обработка кнопки сохранения. Список задач в памяти сначала очищается, затем пересохраняется
      remove()
      save()
};

  const remove = async () => { // Удаление задач
    try {
      let taskItems = await AsyncStorage.removeItem("@save_task") //removeItem - удаление данных из хранилища
    } catch(err) {
      alert(err);
    }
  };

  const showConfirmDialog = (index) => { // Диалоговое окно с выбором действия (будет использовано для обработки нажатия на заметку)
      return Alert.alert(
        "Вы уверены?",
        "Убрать задачу из списка?",
        [
          {
            text: "Да", // При согласии вызывает completeTask и закрывает диалоговое окно
            onPress: () => {
              completeTask(index)
            }
          },
          {
            text: "Нет", // При отказе ничего не происходит
          },
        ]
      );
    };

  useEffect(() => { // Достаём данные через хук эффекта, производим загрузку записанных заметок
    load()
  }, []);

  const Task = (props) => { // Поле для отображения заметок
    press();
    return (
     <View style={{backgroundColor:"#f5f5dc", marginTop:"3%", borderRadius:10, borderColor: 'black',borderWidth: 1, width:"90%", marginLeft:"5%"}}>
          <View style={{marginLeft:"2%"}}>
          <Text selectable={true} style={{fontSize: Dimensions.get('window').width/25}}><Text style={{fontWeight: "bold"}}>Откуда:</Text> {props.text[0]}</Text>
          <Text selectable={true} style={{fontSize: Dimensions.get('window').width/25}}><Text style={{fontWeight: "bold"}}>Куда:</Text> {props.text[1]}</Text>
          <Text selectable={true} style={{fontSize: Dimensions.get('window').width/25}}><Text style={{fontWeight: "bold"}}>Дата отправления:</Text> {props.text[2]}</Text>
          <Text selectable={true} style={{fontSize: Dimensions.get('window').width/25}}><Text style={{fontWeight: "bold"}}>Дата возвращения:</Text> {props.text[3]}</Text>
          <Text selectable={true} style={{fontSize: Dimensions.get('window').width/25,fontWeight: "bold"}}>Заметки:</Text>
          <Text selectable={true} style={{fontSize: Dimensions.get('window').width/25}}>{props.text[4]}</Text>
          </View>
        </View>
    );
    press();
  }
    // ScrollView - это контейнер, для вывода заметок
    // TouchableOpacity + Icon - Кнопка открытия модального окна в котором нужно внести данные для создания заметок
    return (
        <View style={{flex:1}}>
            <ScrollView>
          <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            {
              taskList.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => showConfirmDialog(index)}> 
                    <Task text={ item }> </Task> 
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
            </ScrollView>
            <View style={{justifyContent:'flex-end', alignItems:'flex-end', marginBottom:"2%", marginRight:"2%"}}>
              <TouchableOpacity onPress={() => setplan(true)}>
                <Icon name={"add"}  size={30} color="tomato" reverse/>
              </TouchableOpacity>
            </View>
            <Modal visible={plan}>
              <AntDesign name="close" size={30} style={styles.btn_close} color="black" onPress={() => setplan(false)}/>
              <ScrollView style={{height:'100%', width:'100%'}}>
              <View style={{ alignItems:'center',marginTop:'3%'}}>
              <Text style={{marginTop:'3%', fontSize: (Dimensions.get('window').width/10*8.1)/16,fontWeight: "bold"}}>Откуда:</Text>
              
              <Picker
                selectedValue={selectedValue}
                style={{ width: '80%', alignItems:'center', marginTop:'3%'}}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="Москва" value="Москва" />
                <Picker.Item label="Казань" value="Казань" />
                <Picker.Item label="Санкт-Петербург" value="Санкт-Петербург" />
              </Picker>
              <Text style={{marginTop:'3%', fontSize: (Dimensions.get('window').width/10*8.1)/16,fontWeight: "bold"}}>Куда:</Text>
              <Picker
                selectedValue={selectedValue1}
                style={{ width: '80%', alignItems:'center',marginTop:'3%'}}
                onValueChange={(itemValue, itemIndex) => setSelectedValue1(itemValue)}
              >
                <Picker.Item label="Казань" value="Казань" />
                <Picker.Item label="Санкт-Петербург" value="Санкт-Петербург" />
                <Picker.Item label="Москва" value="Москва" />
              </Picker>
              <Text style={styles.naz}>Дата отправления:</Text>
              <DatePicker date={date} onDateChange={setDate} style={{width: '80%', alignItems:'center',marginTop:'4%'}} format="DD.MM.YYYY"/>
              <Text style={styles.naz}>Дата возвращения:</Text>
              <DatePicker date={date1} onDateChange={setDate1} style={{width: '80%', alignItems:'center',marginTop:'4%'}} format="DD.MM.YYYY"/>
              <Text style={styles.naz}>Заметки:</Text>
              <TextInput style={{marginTop:'3%', width:'80%', flex:1, borderWidth: 1, paddingHorizontal: 5, borderColor:'grey' ,fontSize: (Dimensions.get('window').width/23)}} multiline value={task1} onChangeText={text => setTask1(text)}></TextInput>
              <View style={{width:'80%', marginTop:'3%', marginBottom:'5%'}}>
              <Button title="Сохранить" color="tomato" onPress={() => [addTask(),setplan(false)]} />
              </View>
              </View>
              </ScrollView>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
  btn_close:{
    textAlign: "right",
    marginRight: "5%",
    marginTop: (Dimensions.get('window').height/10)/12
  },
  naz:{
    marginTop:'3%', 
    fontSize: (Dimensions.get('window').width/10*8.1)/16,
    fontWeight: "bold"
  }
  
});

export default second_screen