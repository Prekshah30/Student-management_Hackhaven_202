import React from 'react';
import {useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import tw from 'twrnc';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FlashMessage, { showMessage } from 'react-native-flash-message';



export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const submitHandler = async() => {

    try{
        const response = await axios.post('http://localhost:5000/api/loginUser', {
          email,
          password
        })
        const data = await response.data;
        console.log('Login data:',data)
        if(!data.success){
            console.log('Login failed')
        }
        else {
          localStorage.setItem('userEmail',email )
          localStorage.setItem('userName',data.user.name )
          localStorage.setItem('authToken', data.authToken)
          console.log(localStorage.getItem('authToken'))
          console.log('Login success')
          navigation.navigate('Home')
        }

    }
    catch(err){
      console.log('Error:',err)
    }

    

  };

 
  return (
    <View style={tw`flex-1 mt-2`}>
      {/* Header */}

      <SafeAreaView style={tw`flex `}>
        <View style={tw`flex-row justify-start`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4`}>
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row justify-center`}>
          <Image
            source={require('../assets/images/login.png')}
            style={{width: 200, height: 200}}
          />
        </View>
      </SafeAreaView>

      {/* Form */}
      <View style={tw`flex-1 bg-white px-8 pt-8`}>
        <View style={tw`form space-y-2`}>


      {/* Email */}
          <View>
            <Text style={tw`text-gray-700 ml-4`}>Email Id</Text>
            <View style={tw`flex-row items-center `}>
              <TextInput
                style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3 flex-1 mt-1 `}
                placeholder="Enter your email id"
                placeholderTextColor="#666666"
                keyboardType="text"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Password */}

          <View>
            <Text style={tw`text-gray-700 ml-4`}>Password</Text>
            <TextInput
              style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mt-1 color-black`}
              secureTextEntry
              placeholder="Enter you password"
              placeholderTextColor="#666666"
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Login Button */}
          <View>
            <TouchableOpacity
              onPress={submitHandler}
              style={tw`py-3 bg-yellow-400 rounded-xl mt-4 `}>
              <Text style={tw`text-xl font-bold text-center text-gray-700 `}>
                Login
              </Text>
            </TouchableOpacity>
          </View>


        </View>
      </View>
    </View>
  );
}
