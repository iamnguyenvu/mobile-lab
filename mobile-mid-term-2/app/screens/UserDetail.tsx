import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateUser } from "../api";
import type { User } from "../types";

export default function UserDetail({ route, navigation }: any) {
  const [user, setUser] = useState<User>(route.params.user);
  const [loading, setLoading] = useState(false);

  const toggle = useCallback(async () => { setLoading(true); 
    try { setUser(await updateUser(user.id, { active: !user.active })); } 
    finally { setLoading(false); } }, [user]);

  return (
    <SafeAreaView style={s.c}>
      <View style={s.v}>
        <View style={s.r}><Text style={s.l}>Tên:</Text><Text style={s.t}>{user.name}</Text></View>
        <View style={s.r}><Text style={s.l}>Email:</Text><Text style={s.t}>{user.email}</Text></View>
        <View style={s.r}><Text style={s.l}>Role:</Text><Text style={s.t}>{user.role}</Text></View>
        <View style={s.r}><Text style={s.l}>Status:</Text><Text style={s.t}>{user.active ? "Active" : "Inactive"}</Text></View>
        <Pressable onPress={toggle} style={[s.b, loading && s.d]} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : 
            <Text style={s.bt}>{user.active ? "Tắt" : "Bật"}</Text>}</Pressable>
        <Pressable onPress={() => navigation.navigate("EditUser", { user })} style={s.b}><Text style={s.bt}>Sửa</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: "#fff" },
  v: { margin: 12, padding: 12, backgroundColor: "#f9f9f9" },
  r: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#e5e5e5" },
  l: { color: "#666", fontSize: 14 },
  t: { fontWeight: "600", fontSize: 14 },
  b: { backgroundColor: "#3b82f6", padding: 10, alignItems: "center", marginTop: 10 },
  d: { opacity: 0.5 },
  bt: { color: "#fff", fontWeight: "600" },
});
