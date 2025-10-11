import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { deleteUser, getUsers, updateUser } from "../api";
import { UserItem } from "../components/UserItem";
import type { User } from "../types";

export default function UserList({ navigation }: any) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => { try { setUsers(await getUsers()); } finally { setLoading(false); } }, []);
  useEffect(() => { load(); }, [load]);

  const toggle = useCallback(async (id: string) => { const u = users.find(x => x.id === id); 
    if (u) { await updateUser(id, { active: !u.active }); load(); } }, [users, load]);
  const del = useCallback(async (id: string) => { await deleteUser(id); load(); }, [load]);

  const filtered = useMemo(() => search ? users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) : users, [users, search]);
  const stats = useMemo(() => ({ t: users.length, a: users.filter(u => u.active).length, 
    i: users.filter(u => !u.active).length, ad: users.filter(u => u.role === "admin").length }), [users]);

  if (loading && !users.length) return <SafeAreaView style={s.c}><ActivityIndicator /></SafeAreaView>;

  return (
    <SafeAreaView style={s.c}>
      <View style={s.st}>
        <View style={s.s}><Text style={s.n}>{stats.t}</Text><Text style={s.l}>Tổng</Text></View>
        <View style={s.s}><Text style={s.n}>{stats.a}</Text><Text style={s.l}>Active</Text></View>
        <View style={s.s}><Text style={s.n}>{stats.i}</Text><Text style={s.l}>Inactive</Text></View>
        <View style={s.s}><Text style={s.n}>{stats.ad}</Text><Text style={s.l}>Admin</Text></View>
      </View>
      <TextInput style={s.i} placeholder="Tìm..." value={search} onChangeText={setSearch} />
      <FlatList data={filtered} keyExtractor={i => i.id} 
        renderItem={({ item }) => 
        <UserItem user={item} onPress={() => navigation.navigate("UserDetail", { user: item })} onToggle={toggle} onDelete={del} />} 
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => { setLoading(true); load(); }} />} 
        contentContainerStyle={s.p} />
      <Pressable style={s.f} onPress={() => navigation.navigate("AddUser")}><Text style={s.ft}>Add</Text></Pressable>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: "#fff" },
  st: { flexDirection: "row", padding: 10, gap: 8 },
  s: { flex: 1, alignItems: "center", padding: 6, backgroundColor: "#f5f5f5" },
  n: { fontSize: 18, fontWeight: "bold" },
  l: { fontSize: 10, color: "#666" },
  i: { margin: 10, borderWidth: 1, borderColor: "#ddd", padding: 8, backgroundColor: "#fff" },
  p: { padding: 10 },
  f: { position: "absolute", right: 16, bottom: 16, height: 50, width: 50, borderRadius: 25, 
    backgroundColor: "#3b82f6", justifyContent: "center", alignItems: "center" },
ft: {color: "white"}
});
