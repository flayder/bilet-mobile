import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import DrawMainMenu from "./src/drawers/DrawMainMenu";

export const DrawerRoute = () => {
    const Drawer = createDrawerNavigator()
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="MainMenu" component={DrawMainMenu} />
        </Drawer.Navigator>
    )
}