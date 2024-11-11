import { View,Image, TouchableOpacity, Text, Alert } from "react-native";
import style from '../App.module.css'
import { ClipPath, Defs, G, Path, Pattern, Svg, Use } from "react-native-svg";
import { TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store';
export default function Auth({navigation}) {
    const [login, setlogin] = useState();
    const [password, setpassword] = useState();
    const [email, setemail] = useState();
    

    // async function save(key, value) {
    //     await SecureStore.setItemAsync(key, value);
    //   }
      
    //   async function getValueFor(key) {
    //     let result = await SecureStore.getItemAsync(key);
    //     if (result) {
    //       alert("🔐 Here's your value 🔐 \n" + result);
    //     } else {
    //       alert('No values stored under that key.');
    //     }
    //   }
      const save =async (key, value) =>{
        await SecureStore.setItemAsync(key, value);
        
      }
      const getValueFor =async  (key) =>{
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            navigation.navigate('Счетчики', {
                token:Number(result)
              })
              console.log(result)
              console.log('result')
        } else {
          console.log('не найдено')
        }
      }

    useEffect(()=>{
        // getValueFor('id1')
        // const id = AsyncStorage.getItem('id')
        // console.log(id)
       const ok =  getValueFor('id1')
       console.log(ok)
    })
const showAlert_login = () =>{
Alert.alert(
  'Введите логин',
  'Введите номер лицевого счета',
  [
    {
      text: 'Ввести',
      style: 'cancel',
    },
  ],

)}

const showAlert_login_p = () =>{
    Alert.alert(
      'Введите пароль',
      'Введите пароль от аккаунта',
      [
        {
          text: 'Ввести',
          style: 'cancel',
        },
      ],
    
    )}


    const showAlert_login_error = () =>{
        Alert.alert(
          'Повторите попытку',
          'Неверный логин или пароль',
          [
            {
              text: 'Ввести',
              style: 'cancel',
            },
          ],
        
        )}


    const net = () =>{
      Alert.alert(
        'Не найдено',
        'Пользователя нет в базе водоканала',
        [
          {
            text: 'Ввести',
            style: 'cancel',
          },
        ],
      
      )}
    const function1 =  async() => {
        
if(login!=undefined){
  
    if(password!=undefined){
      const pas = await axios.get(`http://s5.oooblako.ru/systema_base1/hs/KVKAPI_AUTHORIZATION/AUTHORIZATION/${login}`)
      if(pas.data=='Пользователя нет в базе водоканала'){
        net()
       }else{
        const resp =  await axios.post('http://5.35.94.133:5002/api/user/auth',{
          number_schet:login,
          password:password
            })
            .then(function(response) {
             
              console.log(response.data)
     
             if(response.data=='Неверный логин или пароль'){
              showAlert_login_error()
             }else{
              
              // navigation.navigate('Счетчики', {
              //     token:response.data
              //   })
  
                save('id1',String(response.data))
               const dd =  getValueFor('id1')
              
              //   AsyncStorage.setItem('id', response.data);
             }
              
          //   navigation.navigate('Счетчики')
       
            }).catch(function(error) {
              console.log(error)
            
            })
  
  
          if(1==true){
              // navigation.navigate('Счетчики')
          }
         console.log(resp)
       }

    }else{
        showAlert_login_p()
    }

}else{
    showAlert_login()
}
    }
    return (
      <View>
<View style={style.container}>
<Image style={style.login_photo} source={require('../glav.jpg')}/>
<View style={style.pos_cont_top_auth}>

    
    <View style={style.text_abs_label}>
    <Text style={style.text_abs}>
    Счетчики
    </Text>
    </View>

<View style={style.input_auth}>
<Image style={style.img_svg } source={require('../icon_pers.png')}/>

<TextInput style={style.input_auth_}         
onChangeText={setlogin}
 placeholder="Введите ваш лицевой счет"/>
</View>

<View style={style.input_auth}>
<Image style={style.img_svg} source={require('../icon_lock.png')}/>
<TextInput style={style.input_auth_} 
onChangeText={setpassword}
placeholder="Введите пароль"/>
</View>

<TouchableOpacity style={style.but_perekl} onPress={ function1}>
<Text style={style.but_perekl_text}>
    Войти
</Text>
</TouchableOpacity>


</View> 

<View style={style.pos_ap_bot_auth}>
    
<Text style={style.text_auth} >
    Нет учетной записи? 
</Text>

<Text style={style.text_auth}>
    Создайте ее
</Text>
<TouchableOpacity style={style.but_auth} onPress={()=>  navigation.navigate('Reg')} >
    <Text style={style.text_but_auth}>
        Создать аккаунт
    </Text>
</TouchableOpacity>


</View>

</View>
</View>
    )
}