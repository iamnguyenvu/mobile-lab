import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useCart } from "./CartContext";
import { useNavigation } from "@react-navigation/native";

export default function CartScreen() {
    const { items, totalQuantity, totalPrice, setQuantity, removeFromCart, clearCart } = useCart();
    const navigation: any = useNavigation();
    const list = Object.values(items);

    return (
        <View style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
            <View style={{ padding: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff" }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 6 }}>
                    <Text>← Back</Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: "700", fontSize: 16 }}>Giỏ hàng</Text>
                <TouchableOpacity onPress={clearCart} style={{ backgroundColor: "#e11d48", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 }}>
                    <Text style={{ color: "#fff", fontWeight: "600" }}>Xoá hết</Text>
                </TouchableOpacity>
            </View>

            {list.length === 0 ? (
                <View style={{ padding: 16 }}>
                    <Text>Giỏ hàng trống.</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={list}
                        keyExtractor={i => i.id}
                        contentContainerStyle={{ padding: 12 }}
                        renderItem={({ item }) => (
                            <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 8, marginBottom: 10 }}>
                                <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                                <Text>Giá: {item.price.toLocaleString()} ₫</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                        <TouchableOpacity onPress={() => setQuantity(item.id, item.quantity - 1)} style={{ padding: 8, backgroundColor: "#eee", borderRadius: 6 }}>
                                            <Text>-</Text>
                                        </TouchableOpacity>
                                        <Text>{item.quantity}</Text>
                                        <TouchableOpacity onPress={() => setQuantity(item.id, item.quantity + 1)} style={{ padding: 8, backgroundColor: "#eee", borderRadius: 6 }}>
                                            <Text>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={() => removeFromCart(item.id)} style={{ padding: 8, backgroundColor: "#fee2e2", borderRadius: 6 }}>
                                        <Text style={{ color: "#b91c1c" }}>Xoá</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />

                    <View style={{ backgroundColor: "#fff", padding: 12, margin: 12, borderRadius: 8 }}>
                        <Text>Tổng số lượng: {totalQuantity}</Text>
                        <Text style={{ fontWeight: "700", marginTop: 4 }}>Tổng tiền: {totalPrice.toLocaleString()} ₫</Text>
                    </View>
                </>
            )}
        </View>
    );
}
