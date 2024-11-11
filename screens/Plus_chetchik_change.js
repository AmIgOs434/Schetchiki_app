import { View,Image, TouchableOpacity, Text } from "react-native";
import style from '../App.module.css'
import { ClipPath, Defs, G, Path, Pattern, Svg, Use } from "react-native-svg";
import { TextInput } from "react-native-paper";

export default function Plus_chetchik_change({navigation}) {

    return (
        <View>
<View style={style.container_1}>



<View style={style.camera_label}>

</View>
<Text style={style.camera_label_text}>
Направьте камеру на счётчик при хорошем освещении и сделайте снимок так, чтобы все цифры были четко видны.
</Text>

<TouchableOpacity style={style.but_perekl_1} onPress={()=>navigation.navigate('Добавление_сч')}>
<Text style={style.but_perekl_text} >
Исправить фото
</Text>
</TouchableOpacity>

<TouchableOpacity style={style.but_auth_1} onPress={()=>navigation.navigate('Name_schetchik')}>
    <Text style={style.text_but_auth}>
        Далее
    </Text>
</TouchableOpacity>

{/* <Text style={style.text_auth}>
Забыли пароль? Нажмитe, чтобы</Text>

<Text style={style.text_auth}>
восстановить
</Text> */}




</View>
</View>
    )
}