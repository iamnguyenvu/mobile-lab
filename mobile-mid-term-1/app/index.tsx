import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { EditScreen } from "./screens/EditScreen";
import { TodoScreen } from "./screens/TodoScreen";
import type { Todo } from "./types";

/**
 * Navigation Stack Params
 * Định nghĩa kiểu dữ liệu cho params của mỗi screen
 */
export type RootStackParamList = {
    Home: undefined; // Home screen không có params
    Edit: { todo: Todo }; // Edit screen nhận todo object
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root component với Navigation
 * SafeAreaProvider: Xử lý safe area cho iOS (notch, bottom bar)
 */
export default function Index() {
    return (
        <SafeAreaProvider>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#2196F3",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={TodoScreen}
                    options={{ title: "Todo App" }}
                />
                <Stack.Screen
                    name="Edit"
                    component={EditScreen}
                    options={{ title: "Chỉnh sửa" }}
                />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}
