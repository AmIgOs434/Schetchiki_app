import { View,Image, TouchableOpacity, Text, Alert } from "react-native";
import style from '../App.module.css'
import { ClipPath, Defs, G, Path, Pattern, Svg, Use } from "react-native-svg";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
export default function Registration({navigation}) {
    const [login, setlogin] = useState();
    const [password, setpassword] = useState();
    const [email, setemail] = useState();
    const save =async (key, value) =>{
        await SecureStore.setItemAsync(key, value);
      }
      const getValueFor =async  (key) =>{
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            navigation.navigate('Счетчики', {
                token:Number(result)
              })
        } else {
          console.log('не найдено')
        }
      }
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
            const showAlert_email = () =>{
              Alert.alert(
                'Введите вашу почту',
                'Пожалуйста, введите ваш email',
                [
                  {
                    text: 'Ввести',
                    style: 'cancel',
                  },
                ],
              
              )}
              const no = () =>{
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
                const zareg = () =>{
                  Alert.alert(
                    'Уже зарегистрирован',
                    'Пользватель с таким лицевым счетом уже зарегистрирован в базе.',
                    [
                      {
                        text: 'Ввести пароль',
                        style: 'cancel',
                      },
                    ],
                  
                  )}
    const function1 =  async () => {
 
      if(login!=undefined){
  
        if(password!=undefined){
          if(email!=undefined){
           const pas = await axios.get(`http://s5.oooblako.ru/systema_base1/hs/KVKAPI_AUTHORIZATION/AUTHORIZATION/${login}`)
           if(pas.data=='Пользователя нет в базе водоканала'){
            no()
           }else{
            const resp = await axios.post('http://5.35.94.133:5002/api/user/reg',{
              number_schet:login,
              password:password,
              email:email,
              schetchiki:pas.data
                })
                .then( async function(response) {
                   console.log(response.data)
                  if(response?.data=='Дубликат'||response=='Дубликат'){
                    zareg()
                  }else{
                    save('id1',String(response.data))
                    const dd =  getValueFor('id1')
                  }
               



                //   await  axios.post(`http://s5.oooblako.ru/systema_base1/hs/KVK_API_NEWАСС/CREATENEWACC/${response.data}/${email}/${response.data}`).then( async function(response) {
                //     const dd =  getValueFor('id1')
                // })
                
                
      
                
           
      
                }).catch(function(error) {
                  console.log(error)
                
                })
           }

        }else{
          showAlert_email()
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
    <Text style={style.text_abs_1}>
    Новая учётная запись
        </Text>
    </View>

<View style={style.input_auth}>
<Image style={style.img_svg} source={require('../icon_pers.png')}/>
<TextInput style={style.input_auth_} onChangeText={setlogin} placeholder="Введите ваш лицевой счет"/>
</View>

<View style={style.input_auth}>
<Image style={style.img_svg} source={require('../img_pochta.png')}/>
<TextInput style={style.input_auth_} onChangeText={setpassword} placeholder="Введите вашу эл. почту"/>
</View>
<View style={style.input_auth}>
<Image style={style.img_svg} source={require('../icon_pers.png')}/>
<TextInput style={style.input_auth_}onChangeText={setemail} placeholder="Введите пароль"/>
</View>

<TouchableOpacity style={style.but_perekl} onPress={function1}>
<Text style={style.but_perekl_text}>
    Создать аккаунт
</Text>
</TouchableOpacity>

{/* <Text style={style.text_auth}>
Забыли пароль? Нажмитe, чтобы</Text>

<Text style={style.text_auth}>
восстановить
</Text> */}

</View> 

<View style={style.pos_ap_bot_auth}>
    
<Text style={style.text_auth}>
   Уже есть аккаунт? 
</Text>

<Text style={style.text_auth}>
    Войдите
</Text>
<TouchableOpacity style={style.but_auth} onPress={()=>navigation.navigate('Auth')}>
    <Text style={style.text_but_auth}>
        Войти
    </Text>
</TouchableOpacity>


</View>

</View>
</View>
    )
}