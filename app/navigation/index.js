import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../app/screens/Home/HomeScreen'
import Login from '../../app/screens/Login/Login'
import RegisterScreen from '../../app/screens/Register/RegisterScreen'
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const { token } = useSelector((state) => state.auth)
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} initialRouteName={token ? 'Home' : 'Login'}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation