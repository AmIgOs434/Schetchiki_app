import { View,Image, TouchableOpacity, Text, Alert } from "react-native";
import style from '../App.module.css'
import { ClipPath, Defs, G, Path, Pattern, Svg, Use } from "react-native-svg";
import { TextInput } from "react-native-paper";
import { useNavigationContainerRef } from "@react-navigation/native";
import moment from 'moment'; 
import { useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';


import * as Location from 'expo-location';
export default function Name_schetchik({navigation,route}) {
    const navigationRef = useNavigationContainerRef()
    const [nameshetchik, setnameshetchik] = useState();
    const [id, setid] = useState(null);
    const { token } = route.params;
    const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [longitude, setlongitude] = useState();
  const [set, setss] = useState(false);

  
  const [id1, setid1] = useState(null);


  const [latitude, setlatitude] = useState();
    // const { photo } = route.params
    const { photo } = route.params;
    useEffect(() => {
     if(id1==null){
      getValueFor('id1')
     }
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Разрешите пользоваться камерой');
          return;
        }
       
        let location = await Location.getCurrentPositionAsync({});
  
        setLocation(location);
        setlatitude(location['coords']['latitude'])
        setlongitude(location['coords']['longitude'])
        console.log(photo)
      })();
  
    }, []);
    const alert_photo = () =>{
      Alert.alert(
        'Пожалуйста, сделайте фото снова',
        'Пожалуйста, повторите попытку, возможно изображение счетчика не попало в камеру или отсутствует на ней.',
        [
          {
            text: 'Хорошо',
            style: 'cancel',
          },
        ],
      
      )}
    const create_schetchik1 = async () => {
      console.log('ade')
      const ade =  await axios.get('http://5.35.94.133:5002/file.png')
      console.log(ade)
      console.log('ade')

                const resp = await axios.post('http://79.174.92.222:8000/upload-image/',{
                  image:ade
                    })
                    .then(function(response1) {
                      console.log('response1')
                     console.log(response1)
                    }).catch(function(error) {
                      console.log(error)
                      console.log('response1')
                    })

    }
    const getValueFor =async  (key) =>{
      let result = await SecureStore.getItemAsync(key);
      if (result) {
         
            setid1(result)
            console.log(result)
            console.log('result')
      } else {
        console.log('не найдено')
      }
    }
    const create_schetchik =  () => {
      setss(true)
        var currentDate = moment().format("DD MM YYYY");
        
        // const result12 =  fetch('https://s1.1zoom.ru/big3/399/339975-svetik.jpg')
        // console.log(result12)
        
        // const ade =  axios.post('http://5.35.94.133:5002/file.png')
        // console.log(ade)
        const aa = Math.random().toString(36).slice(2)
        console.log('sdsfsd')

        const resp =  axios.post('http://5.35.94.133:5002/api/user/createSchetchiki',{
            name:nameshetchik,
            photo:photo,
            UserId:id1,
            name1:nameshetchik,
            data:currentDate,
            zadolz_po_schetchiku:21212,
            number_schet:id1,
            latitude:latitude,
            longitude:longitude,
            namePhoto:aa
              })
              .then(function(response) {
           
                // const opa =  <Image style={{width: 50, height: 50}} source={{uri: photo}}/>


      
                // console.log(imaag)

                // const resp =  axios.post('http://79.174.92.222:8000/upload-image/',{
                //   image:imaag
                //     })
                //     .then(function(response1) {
                //       console.log('response1')
                //      console.log(response1)
                //     }).catch(function(error) {
                //       console.log(error)
                //       console.log('response1')
                //     })

                if(response.data=='Ошибка загрузки фото в нейросеть'){
                  setss(false)
                  alert_photo() 
                }else{
                  navigation.navigate('Счетчики',{id: response.data.id,token:token,update1:'update'})
                }
                
               
            //   navigation.navigate('Счетчики')
         
              }).catch(function(error) {
                console.log('dsd')

              })
           
    }
    return (
      <View>
<View style={style.container_1}>


          <View style={style.nav_bar}>
          <TouchableOpacity style={style.width_15} onPress={()=>navigation.navigate('Добавление_сч',{token:token})}>
          <Svg
    
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={35}
    height={35}
    viewBox="0 0 24 24"

  >
    <Path
      fill="#FFF"
      d="M14.29 5.707a1 1 0 0 0-1.415 0L7.988 10.6a2 2 0 0 0 0 2.828l4.89 4.89a1 1 0 0 0 1.415-1.414l-4.186-4.185a1 1 0 0 1 0-1.415l4.182-4.182a1 1 0 0 0 0-1.414Z"
    />
  </Svg>
          </TouchableOpacity>
     
      <Text style={style.nav_bar_text}>
   Добавление счетчика
      </Text>
      <View style={style.width_15}></View>
        </View>
<View style={style.label_name_schetchiki}>

<Text style={style.label_name_schetchiki_title}>
    Введите название счетчика
</Text>



<TextInput  onChangeText={setnameshetchik}  style={style.label_name_schetchiki_textinput}/>
<Image style={style.label_name_schetchiki_img} src={'https://sun9-36.userapi.com/c237231/u210034432/docs/d24/f390acdbbc71/free-icon-circle-12689674.png?extra=ZwOnGfVpBiMj_C2mYVV8YZQ_cQlc01fgEUteVJo_RNovIWMbf0Pq1VS0gdnEH_RQNBZL5KdtmP54FVECYzujJBs3-ar0lIsPMXlYriR-WRlEKdkXA5mEUm-9xpmES8rnq6n5HFltVveSy2FPpZIrLc0'}/>





{/* <TouchableOpacity style={style.but_auth_2} onPress={()=>navigation.navigate('Glav_str_next')}> */}
  {set==false?
  <TouchableOpacity style={style.but_auth_2} onPress={create_schetchik}>
    <Text style={style.text_but_auth}>
    Сохранить
</Text>
</TouchableOpacity>
:
<TouchableOpacity style={style.but_auth_211121} >
<Image source={require('../Loader.gif')} style={{ width: 100, height: 100 }} />  
</TouchableOpacity>

}


    


</View>
{/* <Text style={style.text_auth}>
Забыли пароль? Нажмитe, чтобы</Text>

<Text style={style.text_auth}>
восстановить
</Text> */}




</View>
</View>
    )
}