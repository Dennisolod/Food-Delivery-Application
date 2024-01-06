import { View, Text, TouchableOpacity, Image, ScrollView } from'react-native';
import React from 'react';
import { featured } from '../constants';
import { themeColors } from '../theme';
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { StatusBar} from 'expo-status-bar';
import { selectRestaurant } from '../slices/restaurantSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal, removeFromCart } from '../slices/cartSlice';
import { useEffect, useState } from 'react';
import { urlFor } from '../sanity';
export default function CartScreen() {
    const restaurant = useSelector(selectRestaurant);
    const navigation = useNavigation();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const [groupedItems, setGroupedItems] = useState({});
    const dispatch = useDispatch();
    const deliveryFee = 5;

    useEffect(() => {
        const items = cartItems.reduce((group, item)=> {
            if(group[item._id]) {
                group[item._id].push(item);
            } else {
                group[item._id] =[item];
            }
            return group;
        },{})
        setGroupedItems(items);
    }, [cartItems])

    return (
        <View className="bg-white flex-1">
            <StatusBar style="dark" />

            { /* back button */}
            <View className="relative py-7 shadow-sm">
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={{ backgroundColor: themeColors.bgColor(1)}}
                    className="absolute z-10 rounded-full p-1 shadow top-14 left-3"
                >
                    <Icon.ArrowLeft strokeWidth={3} stroke ='white' />
                </TouchableOpacity>
                <View className ="shadow top-6">
                    <Text className="text-center font-bold text-xl">Your cart</Text>
                    <Text className="text-center text-gray-500">{restaurant.name}</Text>
                </View>
            </View>

            { /* delivery time */}
            <View style={{backgroundColor: themeColors.bgColor(0.4)}} className="flex-row px-4 items-center">
                <Image source={require('../assets/images/bikeGuy.png')} className="w-20 h-20" />
                <Text className="flex-1 pl-4">Delivery time: 20-30 minutes</Text>
                <TouchableOpacity>
                    <Text className="font-bold" style={{color: themeColors.text}}>Change</Text>
                </TouchableOpacity>
            </View>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{
                    paddingBottom: 50
                }}
                className="bg-white pt-5"
            >
                {
                    Object.entries(groupedItems).map(([key, items]) => {
                        let dish = items[0];
                        return (
                            <View key= {key} className="flex-row item-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-mb">
                                <Text className="font-bold" style={{color: themeColors.text}}>{items.length} x </Text>
                                <Image className="h-14 w-14 rounded-full" source={{uri: urlFor(dish.image).url()}} />
                                <Text className ="flex-1 font-bold text-gray-700">{dish.name}</Text>
                                <Text className ="font-semibold text-base">${dish.price}</Text>
                                <TouchableOpacity
                                    className="p-1 h-7 w-7 rounded-full"
                                    onPress={()=> dispatch(removeFromCart({id: dish._id}))}
                                    style={{backgroundColor: themeColors.bgColor(1)}}
                                >
                                    <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                                    
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
           
            {/* subtotals */}
            <View style={{backgroundColor: themeColors.bgColor(0.4)}} className="p-6 px-8 rounded-t-3xl space-y-3">
                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Subtotal:</Text>
                    <Text className="text-gray-700">${cartTotal}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Delivery Fee:</Text>
                    <Text className="text-gray-700">${deliveryFee}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-700 font-extrabold">Order Total:</Text>
                    <Text className="text-gray-700 font-extrabold">${deliveryFee + cartTotal}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={()=> navigation.navigate("OrderPreparing")} 
                        style={{backgroundColor: themeColors.bgColor(1)}} 
                        className="p-3 rounded-full"
                    >
                        <Text className="text-white text-center font-bold text-lg">Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}