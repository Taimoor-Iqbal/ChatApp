import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth'
import LottieView from 'lottie-react-native';
export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#03493f" />
            </View>
        )
    }
    const userLogin = async () => {
        setLoading(true)
        if (!email || !password) {
            alert("please add all the field")
            return
        }
        try {
            const result = await auth().signInWithEmailAndPassword(email, password)
                .then(() => console.log("Login success"))
                .catch((err) => Alert.alert("Login error", err.message))
            setLoading(false)
        } catch (err) {
            alert("something went wrong")
        }


    }
    return (
        <KeyboardAvoidingView behavior="position">
            <View style={styles.box1}>
                <Text style={styles.text}>Login</Text>
                <LottieView
                    style={styles.img}
                    source={require('../assets/images/wa.json')}
                    autoPlay
                />
            </View>
            <View style={styles.box2}>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    mode="outlined"
                />
                <TextInput
                    label="password"
                    mode="outlined"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
                <Button
                    mode="contained"
                    onPress={() => userLogin()}
                >Login</Button>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <Text>Dont have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('signup')}>
                        <Text style={{ fontWeight: 'bold' }}> SignUp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    text: {
        fontSize: 40,
        color: "green",
        margin: 10,
        fontFamily: 'OpenSans-ExtraBoldItalic'
    },
    img: {
        width: 200,
        height: 200
    },
    box1: {
        alignItems: "center"
    },
    box2: {
        paddingHorizontal: 40,
        justifyContent: "space-evenly",
        height: "50%"
    }
});