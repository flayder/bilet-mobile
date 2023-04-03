import React, {useEffect} from "react"
import * as Font from "expo-font"
import { DB } from "./db"

export async function bootstrap() {
    try {
        await Font.loadAsync({
            "roboto-regular": require("../assets/fonts/Roboto-Regular.ttf"),
            "roboto-bold": require("../assets/fonts/Roboto-Bold.ttf"),
            "roboto-italic": require("../assets/fonts/Roboto-Italic.ttf"),
            "roboto-bold-italic": require("../assets/fonts/Roboto-BoldItalic.ttf")
        })

        await DB.init()

        console.log('Database is loaded...')
    } catch(e) {
        console.log("Database error ", e)
    }
}