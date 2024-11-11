import { View,Image, TouchableOpacity, Text, ScrollView } from "react-native";
import style from '../App.module.css'
import { ClipPath, Defs, G, Path, Pattern, Svg, Use } from "react-native-svg";
import { TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Glav_str_next_info_info({navigation,route}) {
  const { id } = route.params;
  const [schetchiki, setschetchiki] = useState();

  useEffect(()=>{
    if(schetchiki==undefined){
     const resp =  axios.post('http://5.35.94.133:5002/api/user/getSchetchik_data_one',{
       id:id,
         })
         .then(function(response) {
          
           console.log(response.data.SchetchikId)
           setschetchiki(response.data)
           console.log(`http://5.35.94.133:5002${response.data.photo}`)
       //   navigation.navigate('Счетчики')
    
         }).catch(function(error) {
           console.log(error)
         
         })
    }
 
 
         //  console.log(decoded)  
 })
    return (
      <View>
<ScrollView style={style.container_w1} >
<View style={style.container_1}>


<View style={style.nav_bar}>
          <TouchableOpacity style={style.width_15} onPress={()=>  navigation.navigate('Glav_str_next',{id:schetchiki.SchetchikId})}>
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
        Счетчики
      </Text>
      <View style={style.width_15}></View>
        </View>


<Image style={style.camera_label} src={`http://5.35.94.133:5002${schetchiki?.photo}`}/>



<View style={style.Glav_str_next_info_info_label}>
<Text style={style.Glav_str_next_info_info} >
Последние показания
</Text>
</View>

<View style={style.label_text_}>
<Text style={style.label_text_text}>
  {schetchiki?.meterdata}
</Text>
</View>



<View style={style.Glav_str_next_info_info_label}>
<Text style={style.Glav_str_next_info_info} >
Задолженность</Text>
</View>

<View style={style.label_text_}>
<Text style={style.label_text_text}>
{schetchiki?.arrears} ₽
</Text>
</View>




<View style={style.Glav_str_next_info_info_label}>
<Text style={style.Glav_str_next_info_info} >
Не оплаченные
</Text>
</View>

<View style={style.label_text_}>
<Text style={style.label_text_text}>
{schetchiki?.unpaid}
</Text>
</View>
</View>
</ScrollView>
</View>
    )
}