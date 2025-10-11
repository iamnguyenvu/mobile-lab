import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";

type Props = { name: string; price: number; img?: ImageSourcePropType; onAdd?: () => void };

export default function ProductItem({ name, price, img, onAdd }: Props) {
    return (
        <View style={{ padding: 10, margin: 8, borderWidth: 1, borderColor: "#ddd", borderRadius: 6, alignItems: "center" }}>
            {img && <Image source={img} style={{ width: 80, height: 100, marginBottom: 8 }} />}
            <Text style={{ fontWeight: "bold", marginBottom: 4 }}>{name}</Text>
            <Text style={{ marginBottom: 8 }}>{price.toLocaleString()} ₫</Text>
            <TouchableOpacity onPress={onAdd} style={{ backgroundColor: "green", padding: 10, borderRadius: 4 }}>
                <Text style={{ color: "#fff" }}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );
}
