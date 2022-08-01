import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import Feather from 'react-native-vector-icons/Feather'
import { Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth'

export default function AccountScreen({ user }) {
    const [profile, setProfile] = useState('')

    useEffect(() => {
        firestore().collection('users').doc(user.uid).get().then(docSnap => {
            setProfile(docSnap.data())
        })
    }, [])
    if (!profile) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#03493f" />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={{ uri: profile.pic }} />
            </View>
            <View style={{ flexDirection: "row" }}>
                <Feather name="user" size={30} color="black" />
                <Text style={[styles.text, { marginLeft: 10 }]}>{profile.name}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Feather name="mail" size={30} color="black" />
                <Text style={[styles.text, { marginLeft: 10 }]}>{profile.email}</Text>
            </View>
            <Button
                style={styles.btn}
                mode="contained"
                onPress={() => {
                    firestore().collection('users')
                        .doc(user.uid)
                        .update({
                            status: firestore.FieldValue.serverTimestamp()
                        }).then(() => {
                            auth().signOut()
                        })
                }}
            >Logout</Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "green",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    imgContainer: {
        width: 210,
        height: 210,
        borderRadius: 105,
        // borderWidth: 3,
        elevation: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'

    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 5,


    },
    text: {
        fontSize: 23,
        color: "black"
    },
    btn: {
        borderColor: "white",
    }
})