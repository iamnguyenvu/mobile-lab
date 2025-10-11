import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "./CartContext";

export default function CartSummary() {
    const { totalQuantity, totalPrice, clearCart } = useCart();
    const nav = useNavigation<any>();

    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#fff" }}>
                <Text style={{ fontWeight: "700" }}>Product</Text>
                <TouchableOpacity onPress={() => nav.navigate("CartScreen")} style={{ backgroundColor: "#111", padding: 6, borderRadius: 4 }}>
                    <Text style={{ color: "#fff" }}>Cart ({totalQuantity})</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, margin: 8, backgroundColor: "#fff", borderRadius: 4 }}>
                <Text>Items: {totalQuantity}</Text>
                <Text>{totalPrice.toLocaleString()} ₫</Text>
                <TouchableOpacity onPress={clearCart} style={{ backgroundColor: "#e11d48", padding: 6, borderRadius: 4 }}>
                    <Text style={{ color: "#fff" }}>Clear</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
