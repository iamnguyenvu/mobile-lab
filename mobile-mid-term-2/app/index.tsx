import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddUser from "./screens/AddUser";
import EditUser from "./screens/EditUser";
import UserDetail from "./screens/UserDetail";
import UserList from "./screens/UserList";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UserList} options={{ title: "Users" }} />
      <Stack.Screen name="UserDetail" component={UserDetail} options={{ title: "Chi tiết" }} />
      <Stack.Screen name="EditUser" component={EditUser} options={{ title: "Sửa" }} />
    </Stack.Navigator>
  );
}

export default function Index() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeStack} options={{ title: "Danh sách" }} />
      <Tab.Screen name="AddUser" component={AddUser} options={{ title: "Thêm" }} />
    </Tab.Navigator>
  );
}
