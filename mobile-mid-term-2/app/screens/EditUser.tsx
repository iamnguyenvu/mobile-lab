import { useRef, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateUser } from "../api";
import type { User } from "../types";

export default function EditUser({ route, navigation }: any) {
  const user: User = route.params.user;
  const name = useRef(user.name);
  const email = useRef(user.email);
  const [role, setRole] = useState<"user" | "admin">(user.role);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    if (!name.current.trim() || !email.current.trim()) return;
    setLoading(true);
    try { await updateUser(user.id, { name: name.current, email: email.current, role }); navigation.goBack(); 
    } finally { setLoading(false); }
  };

  return (
    <SafeAreaView style={s.c}>
      <View style={s.f}>
        <Text style={s.l}>Tên</Text>
        <TextInput style={s.i} placeholder="Nhập tên" defaultValue={user.name} onChangeText={t => name.current = t} />
        <Text style={s.l}>Email</Text>
        <TextInput style={s.i} placeholder="Nhập email" defaultValue={user.email} onChangeText={t => email.current = t} />
        <Text style={s.l}>Role</Text>
        <View style={s.r}>
          <Pressable onPress={() => setRole("user")} style={[s.rb, role === "user" && s.ra]}><Text>User</Text></Pressable>
          <Pressable onPress={() => setRole("admin")} style={[s.rb, role === "admin" && s.ra]}><Text>Admin</Text></Pressable>
        </View>
        <Pressable onPress={save} style={[s.b, loading && s.d]} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.bt}>Cập nhật</Text>}</Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: "#fff" },
  f: { padding: 16 },
  l: { fontWeight: "600", marginTop: 8, marginBottom: 4 },
  i: { borderWidth: 1, borderColor: "#ddd", padding: 8, backgroundColor: "#fff" },
  r: { flexDirection: "row", gap: 8 },
  rb: { flex: 1, padding: 8, borderWidth: 1, borderColor: "#ddd", backgroundColor: "#f5f5f5", alignItems: "center" },
  ra: { backgroundColor: "#3b82f6", borderColor: "#3b82f6" },
  b: { backgroundColor: "#3b82f6", padding: 10, alignItems: "center", marginTop: 16 },
  d: { opacity: 0.5 },
  bt: { color: "#fff", fontWeight: "600" },
});