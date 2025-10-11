import {ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Image} from "expo-image";

interface ProductProps {
    title: string;
    price: number;
    img?: ImageSourcePropType;
    onAdd?: () => void;
}

export default function Product({title, price, img, onAdd}: ProductProps){
    return (
        <View style={{ height: 400, width: 200, padding: 20, borderWidth: 1, borderColor: '#ccc', marginBottom: 10, borderRadius: 10, flex: 1, alignItems: "center", justifyContent: "space-between", margin:"auto" }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{title}</Text>

            {img ? (
                <Image source={img} style={{ width: 120, height: 160, marginTop: 10, borderRadius: 8 }} />
            ) : null}
            <Text style={{ marginTop: 6, fontWeight: "bold", textAlign: "center", fontSize: 20 }}>{price.toLocaleString()} đ</Text>

            <TouchableOpacity
                style={{ marginTop: 12, backgroundColor: "#388de2", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8}}
                onPress={onAdd}
            >
                <Text style={{ color: "#fff", fontWeight: "700" }}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    )
}
