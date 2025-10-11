import {CartProvider} from "@/components/CartContext";
import {SafeAreaView} from "react-native-safe-area-context";
import ProductList from "@/components/ProductList";
import CartSummary from "@/components/CartSummary";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import CartScreen from "@/components/CartScreen";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
      <CartProvider>
          <SafeAreaView style={{flex: 1}}>
              <CartSummary />
              <ProductList />
          </SafeAreaView>
      </CartProvider>
  );
}
