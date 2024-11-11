import { View,Image, TouchableOpacity, Text, ScrollView ,RefreshControl} from "react-native";
import style from '../App.module.css'
import { ClipPath, Defs, G, Path, Pattern, Svg, Use } from "react-native-svg";
import { TextInput } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import moment from 'moment';
import * as SecureStore from 'expo-secure-store';
export default function Glav_str({navigation,route}) {
    const { token } = route.params;
    const { update1 } = route.params;
    // const decoded = jwtDecode(token)
    const [schetchiki, setschetchiki] = useState();
    const [ids, setids] = useState(null);
    const [update, setupdate] = useState(update1);
    const [id, setid] = useState(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const [skolo1, setskolo] = useState();

    
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        get()
        setRefreshing(false);
      }, 2000);
    }, []);
  
    // const getValueFor =async  (key) =>{
    //   let result = await SecureStore.getItemAsync(key);
    //   if (result) {
    //     console.log(result)
    //      console.log(Number(result))
    //     setid(result)
    //   } else {
    //     console.log('не найдено')
    //   }
    // }
    const getValueFor =async  (key) =>{
      let result = await SecureStore.getItemAsync(key);
      if (result) {
            
            console.log(result)
            setids(result)
      } else {
        console.log('не найдено')
      }
    }
    useEffect(() => {
      if(ids==null){
        getValueFor('id1')
      }
      
      const unsubscribe = navigation.addListener('focus', () => {
     get()
      });
      return unsubscribe;
    }, [navigation]);



    // useEffect(()=>{
      

       
    //     if(schetchiki==undefined){
    //       console.log(token)
    //   const resp =  axios.post('http://5.35.94.133:5002/api/user/getSchetchiki',{
    //     UserId:token,
    //       })
    //       .then(function(response) {
           
    //         console.log(token)
    //         setschetchiki(response.data)
    //     //   navigation.navigate('Счетчики')
     
    //       }).catch(function(error) {
    //         console.log(error)
          
    //       })

    //     }    //  console.log(decoded)  
    // })
    const get = () =>{
      const resp =  axios.post('http://5.35.94.133:5002/api/user/getSchetchiki',{
        UserId:token,
          })
          .then(function(response) {

          
            let skolo = 0
            response.data.map(item=>
              
              item.Schetchik_data[item.Schetchik_data.length-1]?.zadolz_po_schetchiku==undefined?
              console.log()

             :
             skolo = skolo + Number(item.Schetchik_data[item.Schetchik_data.length-1]?.zadolz_po_schetchiku)
          )
            console.log('skolo')
            setskolo(skolo)
            console.log(skolo)
            setschetchiki(response.data)
        //   navigation.navigate('Счетчики')
           console.log(response.data.map(item=>console.log(item)))
          }).catch(function(error) {
            console.log(error)
          
          })
    }


    const press =  (id) => {
        setschetchiki()
        navigation.navigate('Glav_str_next',{id:id, token:token})
        
    }


  
    const out =async () =>{
      await SecureStore.deleteItemAsync('id1')
      navigation.navigate('Auth')
    }



    return (
      <View>

      <View    style={style.container_11}>
        
        <View style={style.nav_bar}>
          <TouchableOpacity style={style.width_15} onPress={out}>
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
<ScrollView   style={style.container_12} refreshControl={
    <RefreshControl  style={style.container_12}  refreshing={refreshing} onRefresh={onRefresh} />
  } >

<Text style={style.tex_ac} >Задолженность: {skolo1}Р</Text>
<View style={style.item_schetchik_label}>

{
    schetchiki?.map(item=>
        <TouchableOpacity key={item.id} style={style.item_schetchik} onPress={()=>press(item.id)}>

<View style={style.w_20_img} >
<Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"

  >
    <Path
      fill="#fff"
      d="M18.086.086c-6.82.656-12.984 4.93-16.008 11.117-.726 1.469-1.07 2.406-1.453 3.906a18.663 18.663 0 0 0-.602 4.266c-.187 5.594 1.993 10.992 6.04 14.93 1.648 1.593 3.093 2.617 5.148 3.625 1.969.968 3.797 1.539 6.055 1.89 1.117.172 4.109.188 5.234.032 4.547-.625 8.484-2.563 11.633-5.72 4.89-4.882 6.875-11.812 5.351-18.624-.632-2.82-2.148-5.89-4.039-8.188-1.812-2.187-4-3.93-6.539-5.203A20 20 0 0 0 18.086.086Zm3.633 1.25c7.46.687 13.812 5.789 16.125 12.953.633 1.945.867 3.5.867 5.711 0 2.742-.453 4.96-1.484 7.383-3.61 8.406-12.86 13.015-21.704 10.82-4.648-1.156-8.53-3.898-11.203-7.914-.648-.977-1.508-2.672-1.93-3.82-.359-.961-.78-2.657-.96-3.813-.196-1.273-.188-4.062.008-5.351.492-3.22 1.695-6.079 3.664-8.703.726-.97 2.539-2.782 3.515-3.516 2.094-1.563 4.399-2.672 6.852-3.274a18.749 18.749 0 0 1 6.25-.476Z"
    />
    <Path
      fill="#fff"
      d="M18.516 3.125c-4.024.398-7.68 2.117-10.477 4.93-2.617 2.633-4.242 5.875-4.812 9.601-.32 2.102-.047 5.907.445 6.172.094.055 5.515.078 16.351.078 15.336 0 16.211-.008 16.329-.14.18-.203.445-1.922.5-3.258.164-4.172-1.227-8.195-3.946-11.453-2.593-3.094-6.39-5.211-10.445-5.805-1.031-.156-3.023-.219-3.945-.125Zm.859 2.07c0 .938.008.992.195 1.172a.61.61 0 0 0 .43.196.61.61 0 0 0 .43-.196c.187-.18.195-.234.195-1.172 0-.976 0-.976.18-.945.093.023.437.063.758.086 1.421.125 3.445.656 4.804 1.281 1.031.469.969.383.649.93-.157.258-.305.539-.328.625-.125.39.382.82.796.672.125-.047.32-.274.547-.64l.344-.563.234.132c.5.297 1.594 1.172 2.266 1.805 1.031.985 2.578 2.969 2.367 3.04a6.69 6.69 0 0 0-.57.335c-.516.328-.68.586-.57.883.18.476.578.508 1.234.11.258-.157.5-.29.523-.29.086 0 .696 1.352.985 2.149.343.976.672 2.375.773 3.289.055.422.102.89.125 1.023l.031.258h-.976c-.93 0-.984.008-1.164.195a.574.574 0 0 0 0 .86c.18.187.234.195 1.164.195h.969l-.032.29c-.015.163-.07.64-.117 1.054l-.094.765H4.477l-.047-.453a22.212 22.212 0 0 1-.102-1.054l-.055-.602h.907c.508 0 .992-.04 1.101-.086.39-.18.446-.805.102-1.047-.125-.086-.414-.117-1.164-.117-1 0-1 0-.969-.18.023-.093.063-.437.086-.758.125-1.437.648-3.421 1.258-4.765.492-1.078.406-1.008.953-.688.258.157.539.305.625.329.39.124.82-.383.672-.797-.047-.125-.274-.32-.64-.547l-.563-.344.132-.234c.368-.618 1.235-1.672 2.047-2.493 1.102-1.093 2.727-2.343 2.797-2.132.016.039.164.289.336.562.328.516.586.68.883.57.476-.18.508-.578.11-1.234-.157-.258-.29-.5-.29-.523 0-.11 1.54-.774 2.54-1.102a16.989 16.989 0 0 1 3.398-.734c.367-.032.687-.07.726-.078.032 0 .055.43.055.968Z"
    />
    <Path
      fill="#fff"
      d="M25.258 9.883c-.086.062-1.14 1.594-2.328 3.398l-2.172 3.281-.281-.054c-1.047-.227-2.11.305-2.625 1.305-.211.406-.25 1.289-.079 1.804.204.602.852 1.242 1.477 1.43.922.289 1.898.023 2.531-.695.727-.82.758-1.922.086-2.985-.078-.133.188-.57 2.07-3.414 1.883-2.851 2.157-3.297 2.157-3.562 0-.235-.047-.336-.203-.461-.25-.196-.407-.203-.633-.047Zm-4.61 8.023c.649.461.579 1.555-.132 1.89-.766.36-1.61-.14-1.61-.96 0-.938.977-1.461 1.742-.93ZM19.508 27.344c-.57.68-1.938 3.234-2.29 4.273-.413 1.235-.132 2.367.782 3.211.79.711 1.836.961 2.828.656 1.64-.507 2.516-2.18 1.977-3.789-.328-1-1.867-3.867-2.36-4.414-.242-.265-.687-.234-.937.063Zm.976 2.242c.891 1.555 1.313 2.547 1.313 3.094 0 .773-.711 1.601-1.485 1.734a1.777 1.777 0 0 1-1.89-.969c-.352-.695-.266-1.242.406-2.586.352-.718 1.117-2.03 1.172-2.03.023 0 .242.343.484.757Z"
    />
  </Svg>
</View>

<Text style={style.w_60}>
{item.name}
</Text>

<View style={style.w_20}>
<Text style={style.w_20_text}>
    от
</Text>
<Text style={style.w_20_text}>
{moment.utc(item.createdAt).format('DD.MM.YY')}

</Text>
</View>
</TouchableOpacity>
    )
}



{/* <TouchableOpacity  style={style.item_schetchik}>

<View style={style.w_20_img} >
<Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"

  >
    <Path
      fill="#fff"
      d="M18.086.086c-6.82.656-12.984 4.93-16.008 11.117-.726 1.469-1.07 2.406-1.453 3.906a18.663 18.663 0 0 0-.602 4.266c-.187 5.594 1.993 10.992 6.04 14.93 1.648 1.593 3.093 2.617 5.148 3.625 1.969.968 3.797 1.539 6.055 1.89 1.117.172 4.109.188 5.234.032 4.547-.625 8.484-2.563 11.633-5.72 4.89-4.882 6.875-11.812 5.351-18.624-.632-2.82-2.148-5.89-4.039-8.188-1.812-2.187-4-3.93-6.539-5.203A20 20 0 0 0 18.086.086Zm3.633 1.25c7.46.687 13.812 5.789 16.125 12.953.633 1.945.867 3.5.867 5.711 0 2.742-.453 4.96-1.484 7.383-3.61 8.406-12.86 13.015-21.704 10.82-4.648-1.156-8.53-3.898-11.203-7.914-.648-.977-1.508-2.672-1.93-3.82-.359-.961-.78-2.657-.96-3.813-.196-1.273-.188-4.062.008-5.351.492-3.22 1.695-6.079 3.664-8.703.726-.97 2.539-2.782 3.515-3.516 2.094-1.563 4.399-2.672 6.852-3.274a18.749 18.749 0 0 1 6.25-.476Z"
    />
    <Path
      fill="#fff"
      d="M18.516 3.125c-4.024.398-7.68 2.117-10.477 4.93-2.617 2.633-4.242 5.875-4.812 9.601-.32 2.102-.047 5.907.445 6.172.094.055 5.515.078 16.351.078 15.336 0 16.211-.008 16.329-.14.18-.203.445-1.922.5-3.258.164-4.172-1.227-8.195-3.946-11.453-2.593-3.094-6.39-5.211-10.445-5.805-1.031-.156-3.023-.219-3.945-.125Zm.859 2.07c0 .938.008.992.195 1.172a.61.61 0 0 0 .43.196.61.61 0 0 0 .43-.196c.187-.18.195-.234.195-1.172 0-.976 0-.976.18-.945.093.023.437.063.758.086 1.421.125 3.445.656 4.804 1.281 1.031.469.969.383.649.93-.157.258-.305.539-.328.625-.125.39.382.82.796.672.125-.047.32-.274.547-.64l.344-.563.234.132c.5.297 1.594 1.172 2.266 1.805 1.031.985 2.578 2.969 2.367 3.04a6.69 6.69 0 0 0-.57.335c-.516.328-.68.586-.57.883.18.476.578.508 1.234.11.258-.157.5-.29.523-.29.086 0 .696 1.352.985 2.149.343.976.672 2.375.773 3.289.055.422.102.89.125 1.023l.031.258h-.976c-.93 0-.984.008-1.164.195a.574.574 0 0 0 0 .86c.18.187.234.195 1.164.195h.969l-.032.29c-.015.163-.07.64-.117 1.054l-.094.765H4.477l-.047-.453a22.212 22.212 0 0 1-.102-1.054l-.055-.602h.907c.508 0 .992-.04 1.101-.086.39-.18.446-.805.102-1.047-.125-.086-.414-.117-1.164-.117-1 0-1 0-.969-.18.023-.093.063-.437.086-.758.125-1.437.648-3.421 1.258-4.765.492-1.078.406-1.008.953-.688.258.157.539.305.625.329.39.124.82-.383.672-.797-.047-.125-.274-.32-.64-.547l-.563-.344.132-.234c.368-.618 1.235-1.672 2.047-2.493 1.102-1.093 2.727-2.343 2.797-2.132.016.039.164.289.336.562.328.516.586.68.883.57.476-.18.508-.578.11-1.234-.157-.258-.29-.5-.29-.523 0-.11 1.54-.774 2.54-1.102a16.989 16.989 0 0 1 3.398-.734c.367-.032.687-.07.726-.078.032 0 .055.43.055.968Z"
    />
    <Path
      fill="#fff"
      d="M25.258 9.883c-.086.062-1.14 1.594-2.328 3.398l-2.172 3.281-.281-.054c-1.047-.227-2.11.305-2.625 1.305-.211.406-.25 1.289-.079 1.804.204.602.852 1.242 1.477 1.43.922.289 1.898.023 2.531-.695.727-.82.758-1.922.086-2.985-.078-.133.188-.57 2.07-3.414 1.883-2.851 2.157-3.297 2.157-3.562 0-.235-.047-.336-.203-.461-.25-.196-.407-.203-.633-.047Zm-4.61 8.023c.649.461.579 1.555-.132 1.89-.766.36-1.61-.14-1.61-.96 0-.938.977-1.461 1.742-.93ZM19.508 27.344c-.57.68-1.938 3.234-2.29 4.273-.413 1.235-.132 2.367.782 3.211.79.711 1.836.961 2.828.656 1.64-.507 2.516-2.18 1.977-3.789-.328-1-1.867-3.867-2.36-4.414-.242-.265-.687-.234-.937.063Zm.976 2.242c.891 1.555 1.313 2.547 1.313 3.094 0 .773-.711 1.601-1.485 1.734a1.777 1.777 0 0 1-1.89-.969c-.352-.695-.266-1.242.406-2.586.352-.718 1.117-2.03 1.172-2.03.023 0 .242.343.484.757Z"
    />
  </Svg>
</View>

<Text style={style.w_60}>
Горячая вода
</Text>

<View style={style.w_20}>
<Text style={style.w_20_text}>
    от
</Text>
<Text style={style.w_20_text}>
    01.01.24
</Text>
</View>
</TouchableOpacity>
<TouchableOpacity style={style.item_schetchik}>

<View style={style.w_20_img} >
<Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"

  >
    <Path
      fill="#fff"
      d="M18.086.086c-6.82.656-12.984 4.93-16.008 11.117-.726 1.469-1.07 2.406-1.453 3.906a18.663 18.663 0 0 0-.602 4.266c-.187 5.594 1.993 10.992 6.04 14.93 1.648 1.593 3.093 2.617 5.148 3.625 1.969.968 3.797 1.539 6.055 1.89 1.117.172 4.109.188 5.234.032 4.547-.625 8.484-2.563 11.633-5.72 4.89-4.882 6.875-11.812 5.351-18.624-.632-2.82-2.148-5.89-4.039-8.188-1.812-2.187-4-3.93-6.539-5.203A20 20 0 0 0 18.086.086Zm3.633 1.25c7.46.687 13.812 5.789 16.125 12.953.633 1.945.867 3.5.867 5.711 0 2.742-.453 4.96-1.484 7.383-3.61 8.406-12.86 13.015-21.704 10.82-4.648-1.156-8.53-3.898-11.203-7.914-.648-.977-1.508-2.672-1.93-3.82-.359-.961-.78-2.657-.96-3.813-.196-1.273-.188-4.062.008-5.351.492-3.22 1.695-6.079 3.664-8.703.726-.97 2.539-2.782 3.515-3.516 2.094-1.563 4.399-2.672 6.852-3.274a18.749 18.749 0 0 1 6.25-.476Z"
    />
    <Path
      fill="#fff"
      d="M18.516 3.125c-4.024.398-7.68 2.117-10.477 4.93-2.617 2.633-4.242 5.875-4.812 9.601-.32 2.102-.047 5.907.445 6.172.094.055 5.515.078 16.351.078 15.336 0 16.211-.008 16.329-.14.18-.203.445-1.922.5-3.258.164-4.172-1.227-8.195-3.946-11.453-2.593-3.094-6.39-5.211-10.445-5.805-1.031-.156-3.023-.219-3.945-.125Zm.859 2.07c0 .938.008.992.195 1.172a.61.61 0 0 0 .43.196.61.61 0 0 0 .43-.196c.187-.18.195-.234.195-1.172 0-.976 0-.976.18-.945.093.023.437.063.758.086 1.421.125 3.445.656 4.804 1.281 1.031.469.969.383.649.93-.157.258-.305.539-.328.625-.125.39.382.82.796.672.125-.047.32-.274.547-.64l.344-.563.234.132c.5.297 1.594 1.172 2.266 1.805 1.031.985 2.578 2.969 2.367 3.04a6.69 6.69 0 0 0-.57.335c-.516.328-.68.586-.57.883.18.476.578.508 1.234.11.258-.157.5-.29.523-.29.086 0 .696 1.352.985 2.149.343.976.672 2.375.773 3.289.055.422.102.89.125 1.023l.031.258h-.976c-.93 0-.984.008-1.164.195a.574.574 0 0 0 0 .86c.18.187.234.195 1.164.195h.969l-.032.29c-.015.163-.07.64-.117 1.054l-.094.765H4.477l-.047-.453a22.212 22.212 0 0 1-.102-1.054l-.055-.602h.907c.508 0 .992-.04 1.101-.086.39-.18.446-.805.102-1.047-.125-.086-.414-.117-1.164-.117-1 0-1 0-.969-.18.023-.093.063-.437.086-.758.125-1.437.648-3.421 1.258-4.765.492-1.078.406-1.008.953-.688.258.157.539.305.625.329.39.124.82-.383.672-.797-.047-.125-.274-.32-.64-.547l-.563-.344.132-.234c.368-.618 1.235-1.672 2.047-2.493 1.102-1.093 2.727-2.343 2.797-2.132.016.039.164.289.336.562.328.516.586.68.883.57.476-.18.508-.578.11-1.234-.157-.258-.29-.5-.29-.523 0-.11 1.54-.774 2.54-1.102a16.989 16.989 0 0 1 3.398-.734c.367-.032.687-.07.726-.078.032 0 .055.43.055.968Z"
    />
    <Path
      fill="#fff"
      d="M25.258 9.883c-.086.062-1.14 1.594-2.328 3.398l-2.172 3.281-.281-.054c-1.047-.227-2.11.305-2.625 1.305-.211.406-.25 1.289-.079 1.804.204.602.852 1.242 1.477 1.43.922.289 1.898.023 2.531-.695.727-.82.758-1.922.086-2.985-.078-.133.188-.57 2.07-3.414 1.883-2.851 2.157-3.297 2.157-3.562 0-.235-.047-.336-.203-.461-.25-.196-.407-.203-.633-.047Zm-4.61 8.023c.649.461.579 1.555-.132 1.89-.766.36-1.61-.14-1.61-.96 0-.938.977-1.461 1.742-.93ZM19.508 27.344c-.57.68-1.938 3.234-2.29 4.273-.413 1.235-.132 2.367.782 3.211.79.711 1.836.961 2.828.656 1.64-.507 2.516-2.18 1.977-3.789-.328-1-1.867-3.867-2.36-4.414-.242-.265-.687-.234-.937.063Zm.976 2.242c.891 1.555 1.313 2.547 1.313 3.094 0 .773-.711 1.601-1.485 1.734a1.777 1.777 0 0 1-1.89-.969c-.352-.695-.266-1.242.406-2.586.352-.718 1.117-2.03 1.172-2.03.023 0 .242.343.484.757Z"
    />
  </Svg>
</View>

<Text style={style.w_60}>
Горячая вода
</Text>

<View style={style.w_20}>
<Text style={style.w_20_text}>
    от
</Text>
<Text style={style.w_20_text}>
    01.01.24
</Text>
</View>
</TouchableOpacity> */}
</View>





  </ScrollView>
 
  </View>
  </View>
    )
}