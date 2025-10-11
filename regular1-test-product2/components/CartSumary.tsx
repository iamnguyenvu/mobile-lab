import {Text, View} from "react-native";
import {useCart} from "@/components/CartContext";

export default function CartSumary() {
    const {totalQuantity, totalPrice} = useCart();

    return (
        <View style={{margin: 'auto'}}>
          <Text style={{fontWeight: "bold"}}>Total Quantity: {totalQuantity}</Text>
            <Text style={{fontWeight: "bold"}}>Total Price: {totalPrice}</Text>
        </View>
    )
}
