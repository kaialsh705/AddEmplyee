import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Index from '../screens/Emplyee/Index';
import DrawerContentIndex from '../screens/DrawerContentIndex';

const Drawer = createDrawerNavigator();

function DrawerNavigator(props) {
    return (
        <Drawer.Navigator
            drawerType={'slide'}
            drawerPosition={'left'}
            drawerContent={() => <DrawerContentIndex/>}>
            <Drawer.Screen name="Index" component={Index}/>
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
