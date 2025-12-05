import { FlatList, Image, Pressable, StyleSheet } from 'react-native';
import type { CartItem } from '@/types';

import { Text, View } from '@/components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { use, useCallback, useMemo } from 'react';
import { clearCart, removeFromCart, updateQuantity } from '@/store/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((s: RootState) => s.cart.items) as CartItem[]
  const total = useMemo(() => cartItems.reduce((a, i) => a + i.quantity * i.price, 0), [cartItems])
  const totalItems = useMemo(() => cartItems.reduce((a, i) => a + i.quantity, 0), [cartItems])

  const handleQuantity = useCallback((id: string, delta: number) => {
    dispatch(updateQuantity({id, delta}))
  }, [dispatch])

  const handleRemove = useCallback((id: string) =>  {
    dispatch(removeFromCart(id))
  }, [dispatch])

  const handleClear = useCallback(() => {dispatch(clearCart())}, [])

  const renderItem = ({item} : {item: CartItem}) => {
    return (
          <View className='border border-gray-400 p-2 rounded-lg mb-2 gap-2'>
            <View className='flex-row items-center justify-evenly'>
              <Image source={{uri: item.image}} className='w-20 h-20'/>
              <View className=''>
                <Text>Name: {item.name}</Text>
                <Text>Price: {item.price}</Text>
              </View>
              <View className='flex-row gap-2 items-center justify-center'>
                <Pressable onPress={() => handleQuantity(item.id, -1)} className='bg-blue-500 p-2 px-4 rounded-full'><Text className='text-white'>-</Text></Pressable>
                <Text>{item.quantity}</Text>
                <Pressable onPress={() => handleQuantity(item.id, +1)} className='bg-blue-500 p-2 px-4 rounded-full'><Text className='text-white'>+</Text></Pressable>
                <Pressable onPress={() => handleRemove(item.id)} className='bg-red-500 p-2 px-4 rounded-lg'><Text className='text-white'>Remove</Text></Pressable>
              </View>
            </View>
          </View>
        )
  }

  return (
    <View className='flex-1'>
      {cartItems.length === 0 ? <View className='items-center justify-center'><Text>Gio hang trong</Text></View> : 
        <View>
          <FlatList data={cartItems} keyExtractor={item => item.id} renderItem={renderItem} />
          <View className='items-center justify-center'>
            <Text className='font-semibold text-lg'>Total item: {totalItems}</Text>
            <Text className='font-bold text-xl'>Total Amount: {total.toLocaleString()}</Text>
            <Pressable onPress={() => handleClear()} className='bg-red-500 p-2 px-4 rounded-lg w-60 items-center justify-center'><Text>Clear Cart</Text></Pressable>
          </View>
        </View>
      }
      
    </View>
  );
}

