import 'react-native-gesture-handler'
import React from "react"
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from "@react-navigation/drawer"
import {LoadingScreen} from "./src/screens/LoadingScreen"
import { SignInScreen } from './src/screens/SignInScreen';
import { RestorePassEmailScreen } from './src/screens/RestorePassEmailScreen';
import { RestorePassEmailSuccessScreen } from './src/screens/RestorePassEmailSuccessScreen';
import { MainPageScreen } from './src/screens/MainPageScreen';
import { ScannerScreen } from './src/screens/ScannerScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { DetailScreen } from './src/screens/DetailScreen';
import { StatisticScreen } from './src/screens/StatisticScreen'

export const Route = () => {
   const Drawer = createDrawerNavigator()
   return (
       <NavigationContainer>
           {/*drawerContent={AppDrawerContentHandler}*/}
           <Drawer.Navigator
               initialRouteName="LoadingScreen"
               //drawerContent={props => <AppDrawerSearchParametersContentHandler {...props} />}
               screenOptions={() => ({
                   headerShown: false,
                   drawerPosition: "right"
               })}
           >

               {/*Экран загрузки*/}
               <Drawer.Screen name="LoadingScreen" component={LoadingScreen} options={{ gestureEnabled: false }} />
               
               {/*Экран авторизации*/}
               <Drawer.Screen name="SignInScreen" component={SignInScreen} options={{ gestureEnabled: false }} />
               
               {/*Экран восстановление пароля*/}
               <Drawer.Screen name="RestorePassEmailScreen" component={RestorePassEmailScreen} options={{ gestureEnabled: false }} />
               
               {/*Экран восстановление пароля успешная отправка*/}
               <Drawer.Screen name="RestorePassEmailSuccessScreen" component={RestorePassEmailSuccessScreen} options={{ gestureEnabled: false }} />
               
               {/*Экран главный*/}
               <Drawer.Screen name="MainPageScreen" component={MainPageScreen} options={{ gestureEnabled: false }} />
               
               {/*Экран для сканирования*/}
               <Drawer.Screen name="ScannerScreen" component={ScannerScreen} options={{ gestureEnabled: false }} />
               
               {/*Экран поиска*/}
               <Drawer.Screen name="SearchScreen" component={SearchScreen} options={{ gestureEnabled: false }} />
               
               {/*Экран статистики*/}
               <Drawer.Screen name="StatisticScreen" component={StatisticScreen} options={{ gestureEnabled: false }} />
               
               {/*Экран детальной информации*/}
               <Drawer.Screen name="DetailScreen" component={DetailScreen} options={{ gestureEnabled: false }} />
               
           </Drawer.Navigator>
       </NavigationContainer>
   )
}