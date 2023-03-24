import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import Index from '../screens/Emplyee/Index'
import AddEmployeeForm from '../screens/Emplyee/AddEmployeeForm'
import EmployeeList from '../screens/Emplyee/EmployeeList'
import DrawerNavigator from '../routes/DrawerStack'

const HomeStack = () => {
    return (
        <Stack.Navigator
            animationEnabled={true}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="DrawerNavigator"
                component={DrawerNavigator}
                options={{title: 'Index'}}
            />
            <Stack.Screen
                name="AddEmployeeForm"
                component={AddEmployeeForm}
                options={{title: 'AddEmployeeForm'}}
            />
            <Stack.Screen
                name="EmployeeList"
                component={EmployeeList}
                options={{title: 'EmployeeList'}}
            />
        </Stack.Navigator>
    )
}
export default HomeStack
