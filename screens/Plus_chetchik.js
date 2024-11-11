import { View,Image, TouchableOpacity, Text } from "react-native";
import style from '../App.module.css'
import { ClipPath, Defs, G, Path, Pattern, Svg, Use } from "react-native-svg";
import { TextInput } from "react-native-paper";


import * as Location from 'expo-location';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
export default function Plus_chetchik({navigation,route}) {
  const { token } = route.params;
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState(null);
    const { id } = route.params;
    const [imageUri, setImageUri] = useState();
    const [io, setio] = useState();

    const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [set, setss] = useState(false);

  const [longitude, setlongitude] = useState();
  const [latitude, setlatitude] = useState();
  

  useEffect(() => {
   


  })
  useEffect(() => {

    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
     
      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
      setlatitude(location['coords']['latitude'])
      setlongitude(location['coords']['longitude'])
    })();

  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location)
  }
    if (!permission) {
      // Camera permissions are still loading
      return <View />;
    }
  
    if (!permission.granted) {
      // Camera permissions are not granted yet
      return (
        
        <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Разрешите пользоваться камерой</Text>
        <Button tyle={styles.bbby} onPress={requestPermission} title="Разрешить" />
      </View>
  
      );
    }
  
    function toggleCameraType() {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePicture = async () => {
        if (camera) {
      
 

        const options = { quality: 0.7, base64: true };
        const data = await camera.takePictureAsync(options);
        
        const source = data.base64


        let base64Icon = `data:image/jpg;base64,${source}`;

          setio(base64Icon)
          setImageUri(data.uri);
        }
      };

      const resetPicture = async () => {
        setImageUri();
      }

    return (
      <View>
<View style={style.container_1}>

<View style={style.nav_bar}>
          <TouchableOpacity style={style.width_15} onPress={()=>navigation.navigate('Счетчики',{token:token})}>
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

<View style={style.camera_label}>
<View style={style.mask_camera}></View>
{imageUri? <Image source={{ uri: imageUri }} style={{ height:380, borderRadius:190,width:'100%'}} />:
<View style={{ height:'100%', overflow: 'hidden' ,width:'100%', borderRadius:190}}>

<Camera style={styles.camera}  style={{ height:'100%', overflow: 'hidden' ,width:'100%', borderRadius:190}} borderRadius={'190%'} ref={(ref) => setCamera(ref)} type={type}></Camera>
</View>
    }
</View>
<Text style={style.camera_label_text}>
Направьте камеру на счётчик при хорошем освещении и сделайте снимок так, чтобы все цифры были четко видны.
</Text>

<TouchableOpacity style={style.but_perekl_12} onPress={imageUri?resetPicture:takePicture}>
<Text style={style.but_perekl_text}>
{imageUri? 'Исправить':'Сделать фото' }
</Text>
</TouchableOpacity>




{
  set==false?
<TouchableOpacity style={imageUri? style.but_perekl_12:style.but_perekl_none}  onPress={()=>navigation.navigate('Name_schetchik',{photo:io,token:token,latitude:latitude,longitude:longitude})}>   
<Text style={style.but_perekl_text}>
    Далее
</Text>
</TouchableOpacity>
:
<TouchableOpacity style={style.but_auth_211121} >
<Image source={require('../Loader.gif')} style={{ width: 100, height: 100 }} />  
</TouchableOpacity>
}

{/* <Text style={style.text_auth}>
Забыли пароль? Нажмитe, чтобы</Text>

<Text style={style.text_auth}>
восстановить
</Text> */}



</View>
</View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
      borderRadius:200
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
      borderRadius:200
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
      borderRadius:200
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      
      color: 'white',
    },
  });