import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Index from '../screens/Emplyee/Index';
import DrawerContentIndex from '../screens/DrawerContentIndex';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "green",
                    height: 80,
                }
            }}
            drawerType={'slide'}
            drawerPosition={'left'}
            drawerContent={(props) => <DrawerContentIndex {...props} />}>
            <Drawer.Screen name="Index" component={Index}/>
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
