import { View, Text, Image } from 'react-native';
import React from 'react';
import { useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';

export default function OrderPreparing() {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            // move to delivery screen
            navigation.navigate('Delivery');
        }, 1700)
    },[])
return(
    <View className="flex-1 bg-white justify-center items-center">
        <Image source={require('../assets/images/delivery.gif')} className="h-80 w-80"/>    
    </View>
)
}