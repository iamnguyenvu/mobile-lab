import {FlatList, Text, TouchableOpacity, View} from "react-native";
import { useMemo } from "react";
import ProductItem from "./ProductItem";
import { useCart } from "./CartContext";

const books = [
    { id: "1", name: "Hai số phận", price: 150000, img: require("../assets/images/hai-so-phan.png") },
    { id: "2", name: "Giết con chim nhại", price: 100000, img: require("../assets/images/hai-so-phan.png") },
    { id: "3", name: "Cuốn theo chiều gió", price: 250000, img: require("../assets/images/hai-so-phan.png") },
    { id: "4", name: "Đồi gió hú", price: 50000, img: require("../assets/images/hai-so-phan.png") },
    { id: "5", name: "Đồi gió hú", price: 50000, img: require("../assets/images/hai-so-phan.png") },
    { id: "6", name: "Đồi gió hú", price: 50000, img: require("../assets/images/hai-so-phan.png") },
    { id: "7", name: "Đồi gió hú", price: 50000, img: require("../assets/images/hai-so-phan.png") },
    { id: "8", name: "Đồi gió hú", price: 50000, img: require("../assets/images/hai-so-phan.png") },
    { id: "9", name: "Đồi gió hú", price: 50000, img: require("../assets/images/hai-so-phan.png") },
    { id: "10", name: "Đồi gió hú", price: 50000, img: require("../assets/images/hai-so-phan.png") },
    { id: "11", name: "Đồi gió hú", price: 50000, img: require("../assets/images/hai-so-phan.png") },
    { id: "12", name: "Đồi gió hú", price: 50000, img: require("../assets/images/hai-so-phan.png") },
    { id: "12", name: "Đồi gió hú", price: 50000, img: require("../assets/images/hai-so-phan.png") },
    { id: "14", name: "Đồi gió hú", price: 50000, img: require("../assets/images/hai-so-phan.png") },
    { id: "15", name: "Đồi gió hú", price: 50000, img: require("../assets/images/hai-so-phan.png") },
    { id: "16", name: "Đồi gió hú", price: 50000, img: require("../assets/images/hai-so-phan.png") },
];

export default function ProductList() {
    const data = useMemo(() => books, []);
    const { addToCart } = useCart();

    return (
        <View style={{ flex: 1 }}>
            <FlatList data={data} keyExtractor={i => i.id} numColumns={4} contentContainerStyle={{padding: 8}}
                      columnWrapperStyle={{ justifyContent: "space-between" }}
                renderItem={({ item }) => (
                    <ProductItem name={item.name} price={item.price} img={item.img}
                        onAdd={() => addToCart({ id: item.id, name: item.name, price: item.price })}
                    />
                )}
            />
        </View>
    );
}
