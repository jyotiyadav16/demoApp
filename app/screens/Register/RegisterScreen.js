import { unwrapResult } from '@reduxjs/toolkit'
import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '../../common'
import { postRegistration } from '../../redux/slices/authSlice'
import { _validateEmail } from '../../utils'

const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { status } = useSelector((state) => state.auth)
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const checkValidation = () => {
        if (email.trim().length === 0 && password.trim().length === 0) {
            showToast('danger', 'Émail is required', 2500);
            return false;

        } else if (!_validateEmail(email)) {
            showToast('danger', 'Please enter valid email', 2500);
            return false;
        } else if (password.trim().length === 0) {
            showToast('danger', 'Password is required', 2500);
            return false;
        } else {
            return true;
        }
    };

    const onPressRegister = () => {
        if (checkValidation()) {
            const payload = {
                email, password
            }
            dispatch(postRegistration(payload)).then(unwrapResult).then((res) => {
                if (res.status == 200) {
                    navigation.goBack()
                    showToast('success', 'Registration sucessfull login to continue', 2500);
                }
            }).catch((error) => {
                console.log({ error })
                showToast('danger', 'Failed to register ', 2500);

            })
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Registration</Text>
            {/* <Image style={styles.image} source={require("./assets/log2.png")} />  */}
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#D3D3D3"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#D3D3D3"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.forgot_button}>  Already have an account? Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressRegister} style={styles.regBtn}>
                {status == 'loading' ?
                    <ActivityIndicator
                        color="white"
                        style={{ marginLeft: 8 }} /> :
                    <Text style={styles.regText}>REGISTER</Text>}
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20
    },
    welcomeText: {
        color: '#000',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30
    },
    image: {
        marginBottom: 40,
    },
    inputView: {
        backgroundColor: "#808080",
        borderRadius: 30,
        height: 45,
        marginBottom: 20,
        // alignItems: "center",
        paddingLeft: 10
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        color: '#fff'
        // marginLeft: 20,
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
        textAlign: 'center'
    },
    regBtn: {
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#000",
    },
    regText: {
        color: '#fff',
        fontWeight: 'bold'
    }
});
export default RegisterScreen