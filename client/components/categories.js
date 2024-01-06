import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, {useState, useEffect} from 'react';
import { urlFor } from '../sanity';
import { getCategories } from '../api';

export default function Categories() {
    const [activeCategory, setActiveCategory] = useState(null);

    let [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(data => {
            setCategories(data);
        })
    },{})

    return (
        <View className="mt-4">
            <ScrollView
                horizontal
                showsVerticalScrollIndicators={false}
                className="overflow-visible"
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}>
                {
                    categories.map((category, index) => {
                        let isActive = category._id == activeCategory;
                        let btnClass = isActive? 'bg-gray-600' : 'bg-gray-200';
                        let textClass = isActive? 'font-semibold text-gray-800' : 'text-gray-500';
                        return (
                            <View key={category.id} className="flex justify-center items-center mr-6">
                                <TouchableOpacity 
                                    onPress={()=> setActiveCategory(category._id)} 
                                    className={"p-1 rounded-full shadow" + btnClass}>
                                    <Image style={{width: 60, height:45}} source={{uri: urlFor(category.image).url()}} />
                                </TouchableOpacity>
                                <Text className={"text-sm "+textClass}>{category.name}</Text>
                            </View>
                        )
                    })
                }

            </ScrollView>
            
            
        </View>
    );
}