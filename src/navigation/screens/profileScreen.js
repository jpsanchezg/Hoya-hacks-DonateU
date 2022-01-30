import React, { useEffect, useState, Component } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, db, signOutUser } from '../../DB/dbconnection'

//screens
import LoginScreen from './LoginScreen';

const ProfileScreen = () => {
    const [user, loading, error] = useAuthState(auth);
    const [firstName, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [uid, setUid] = useState("");
    const navigation = useNavigation();


    const fetchUserdata = async () => {
        const query = await db
            .collection("users")
            .where("uid", "==", user?.uid)
            .get();
        const data = await query.docs[0].data();
        setFirstName(data.firstName);
        setLastName(data.lastname);
        setUsername(data.username);
        setUid(data.uid);
    }

    useEffect(() => {
        if (loading) return;
        if (!user) {
            navigation.push('Login')
        }

        fetchUserdata();
    }, [user, loading]);

    return (
        <View style={styles.container}>
            <Image
                style={styles.logoDonateu}
                source={require('../../assets/logo-donateU.png')}
            />
            <Text style={styles.headertext}>Your profile</Text>

            <View style={styles.buttonContainer}>



                <Text
                    style={styles.text}
                >{firstName}</Text>
                <Text
                    style={styles.text}
                >{lastname}</Text>
                <Text
                    style={styles.text}
                >{username}</Text>
                <TouchableOpacity
                    onPress={signOutUser}
                    style={[styles.button]}
                >
                    <Text style={styles.buttonOutlineText}>Sign out</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: 100,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    logoDonateu: {
        width: 150,
        height: 150,
        padding: 40,
    }, headertext: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});
