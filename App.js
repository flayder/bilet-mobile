import React, {useState} from 'react'
console.disableYellowBox = true;
import AppLoading from "expo-app-loading"
import { Route } from "./route"
import { Provider } from "react-redux"
import store from "./src/store"
import { bootstrap } from './src/bootstrap';

export default function App() {
  //LogBox.ignoreLogs(['Warning: ...']);
  const [isReady, setIsReady] = useState(false)
  if(!isReady) {
    return <AppLoading
        startAsync={bootstrap}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
    />
  } else {
      try {
          return (
              <Provider store={store}>
                  <Route />
              </Provider>
          )
      } catch (e) {
          console.log('criticalErrorIs', e)
          // return (
          //     <Provider store={store}>
          //         <Route />
          //     </Provider>
          // )
      }
  }
}
