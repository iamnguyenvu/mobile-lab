import { useProducts } from "@/hooks/useProducts";
import type { RootState } from "@/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
export default function Details() {
    const {id} = useLocalSearchParams<{id: string}>()
    const router = useRouter();
    const { selected, createProduct, editProduct} = useProducts()
    const isNew = id === 'new';

    const [name, setName] = useState('')
    const [price, setPrice] = useState<number>(0)  
    const [image, setImage] = useState('')

    useEffect(() => {
        if(!isNew && selected) {
            setName(selected.name);
            setPrice(selected.price);
            setImage(selected.image);
        }
    }, [isNew, selected])
    
    const handleSubmit = useCallback(async () => {
        if(!name.trim() || Number.isNaN(price) || !image.trim()) {
            Alert.alert("Error", "All field is require!");
            return;
        }

        const payload = {
            name: name.trim(),
            price,
            image: image
        }

        if(isNew) {
            await createProduct(payload);
        } else if(id) {
            await editProduct(id, payload);
        }

        router.back()
    }, [name, price, image, id, createProduct, editProduct, router, isNew])

    return (
        <View className="flex-1 p-4 items-center">
            <View className="flex-row items-center mb-3">
                <Text className="font-semibold">Name: </Text>
                <TextInput value={name} onChangeText={(text) => setName(text)} placeholder="Name..." className="border border-gray-700 rounded-md p-2"/>
            </View>
            <View className="flex-row items-center mb-3">
                <Text className="font-semibold">Price: </Text>
                <TextInput value={price.toString()} keyboardType="number-pad" onChangeText={(text) => setPrice(Number(text))} placeholder="Price..." className="border border-gray-700 rounded-md p-2"/>
            </View>
            <View className="flex-row items-center mb-3">
                <Text className="font-semibold">Image: </Text>
                <TextInput value={image} onChangeText={(text) => setImage(text)} placeholder="Name..." className="border border-gray-700 rounded-md p-2"/>
            </View>
            <Pressable onPress={() => handleSubmit()} className="bg-blue-500 rounded-md p-2 px-4 w-20"><Text>{isNew ? 'Create' : 'Update'}</Text></Pressable>
        </View>
    )
}