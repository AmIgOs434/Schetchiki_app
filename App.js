import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Auth from './screens/Auth';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Registration from './screens/Registration';
import Glav_str from './screens/Glav_str';
import Plus_chetchik from './screens/Plus_chetchik';
import Plus_chetchik_change from './screens/Plus_chetchik_change';
import Name_schetchik from './screens/Name_schetchik';
import Glav_str_next from './screens/Glav_str_next';
import Glav_str_next_info from './screens/Glav_str_next_info';
import Glav_str_next_info_info from './screens/Glav_str_next_info_info';
import Plus_chetchik_1 from './screens/Plus_chetchik_1';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (

    <NavigationContainer >
      <StatusBar style="light" />

      <Stack.Navigator>
   
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
       <Stack.Screen
          name="Reg"
          component={Registration}
          options={{headerShown: false}}
        />
   
               <Stack.Screen
          name="Счетчики"
          component={Glav_str}
          options={{headerShown: false}}
        //   options={{
        //     title: 'Счетчики',
        //     headerStyle: {
        //         backgroundColor: '#4F3B1D',
        //         opacity:0.83,
        //         height:'13%',
                
                
        //     },
        //     headerTintColor: '#fff',
        //     headerTitleStyle: {
        //         fontWeight: 'bold',
        //         fontSize:20
        //     },
        // }}
        />
                <Stack.Screen
            options={{headerShown: false}}
          name="Добавление_сч"
          component={Plus_chetchik}

        />
                 <Stack.Screen
            options={{headerShown: false}}
          name="Добавление_сч_1"
          component={Plus_chetchik_1}

        />
               <Stack.Screen
            options={{headerShown: false}}
          name="Добавление_сч_исправление"
          component={Plus_chetchik_change}
          options={{
            title: 'Добавление счетчика',
            headerBackTitleVisible:false,
            headerStyle: {
                backgroundColor: '#4F3B1D',
                opacity:0.83,
                height:'13%'
                
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize:20
            },
        }}
        />

<Stack.Screen
            options={{headerShown: false}}
          name="Name_schetchik"
          component={Name_schetchik}

        />


<Stack.Screen
            options={{headerShown: false}}
          name="Glav_str_next"
          component={Glav_str_next}
          options={{



            title: 'Отчеты',
            headerBackTitleVisible:false,
            headerStyle: {
            backgroundColor: '#4F3B1D',
            opacity:0.83,
            height:'13%'
                
            },


            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize:20
            },
        }}
        />


<Stack.Screen
            options={{headerShown: false}}
          name="Glav_str_next_info"
          component={Glav_str_next_info}
          options={{
            title: 'Отчеты',
            headerBackTitleVisible:false,
            headerStyle: {
                backgroundColor: '#4F3B1D',
                opacity:0.83,
                height:'13%'
                
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize:20
            },
        }}
        />



<Stack.Screen
            options={{headerShown: false}}
          name="Glav_str_next_info_info"
          component={Glav_str_next_info_info}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );  
};

