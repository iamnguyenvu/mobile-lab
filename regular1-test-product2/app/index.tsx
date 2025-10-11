import {CartProvider} from "@/components/CartContext";
import {SafeAreaView} from "react-native-safe-area-context";
import ProductList from "@/components/ProductList";
import CartSumary from "@/components/CartSumary";

export default function Index() {
  return (
    <CartProvider>
        <SafeAreaView style={{ flex: 1, alignItems: "center", padding: 20, margin: 'auto', gap: 20 }}>
            <CartSumary />
            <ProductList />
        </SafeAreaView>
    </CartProvider>
  );
}
