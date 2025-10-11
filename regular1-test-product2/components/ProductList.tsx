import {FlatList, ScrollView, Text, View} from "react-native";
import {useCart} from "@/components/CartContext";
import Product from "@/components/Product";
import {useMemo} from "react";

const books = [
    {id: "1", title: "Hai so phan", price: 150000, img: require("../assets/images/hai-so-phan.png")},
    {id: "2", title: "Giet con chim nhai", price: 100000, img: require("../assets/images/hai-so-phan.png")},
    {id: "3", title: "Cuon theo chieu gio", price: 250000, img: require("../assets/images/hai-so-phan.png")},
    {id: "4", title: "Doi gio hu", price: 50000, img: require("../assets/images/hai-so-phan.png")},
]

export default function ProductList() {
    const data = useMemo(() => books, []);

    const { addToCart } = useCart();

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={({item}) => (
                    <Product title={item.title} price={item.price} img={item.img}
                             onAdd={() => addToCart({id: item.id, title: item.title, price: item.price})}/>
                )}
                keyExtractor={item => item.id.toString()}
                numColumns={4}
                horizontal={false}
                style={{ flex: 1, flexWrap: "wrap" }}
            />
        </View>
    )
}
