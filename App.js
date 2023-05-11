import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const uri = 'https://us.123rf.com/450wm/natrot/natrot1608/natrot160800105/61348388-degradado-azul-abstracto-se-utiliza-como-fondo-para-la-exhibici%C3%B3n-de-productos-vector.jpg?ver=6'
const imagePerfil = 'https://cdn2.iconfinder.com/data/icons/blog-7/80/user_avatar_profile_login_button_account_member-512.png'


function HomeScreen () {
  return (
    <View style={styles.container}>
      <Text>Si agarra xd</Text>
    </View>
      )
}

function LoginScreen () {

const [email, setEmail] = React.useState('')
const [password, setPassword] = React.useState('')
const navigation = useNavigation();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const handleCreateAcount = () => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log('Cuenta Creada')
    const user = userCredential.user;
    console.log(user)
  })
  .catch(error => {
    console.log(error)
    Alert.alert(error.message)
  })
}

const handleSignIn = () => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log('Sesion iniciada')
    const user = userCredential.user;
    console.log(user)
    navigation.navigate('Home');
  })
  .catch(error => {
    console.log(error)
  })
}

  return (
    <View style={styles.container}>
      <Image source={{uri}} style={[styles.image, StyleSheet.absoluteFill]}/>
      <ScrollView contentContainerStyle={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <BlurView intensity={100}>
          <View style={styles.login}>
          <Image source={{uri: imagePerfil}} style={styles.imagePerfil}/>
          <View>
          <Text style={{fontSize: 17, fontWeight: '400', color:'white'}}>Correo electrónico:</Text>
          <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder='example@gmail.com' />
          </View>

          <View>
          <Text style={{fontSize: 17, fontWeight: '400', color:'white'}}>Contraseña:</Text>
          <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder='password' secureTextEntry={true} />
          </View>
          <TouchableOpacity onPress={handleSignIn} style={styles.boton}>
          <Text style={{fontSize: 17, fontWeight: '400', color:'white'}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreateAcount} style={styles.boton}>
          <Text style={{fontSize: 17, fontWeight: '400', color:'white'}}>Crear Cuenta</Text>
          </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Home' component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  login:{
    width: 350,
    height: 500,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center'
  },
  imagePerfil: {
    width: 100,
    height: 100,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 50,
    marginVertical: 30
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20
  },
  boton: {
    width: 250,
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#00CFEB90',
    alignItems: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1
  }
});
