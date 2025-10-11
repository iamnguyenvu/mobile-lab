import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { User } from "../types";

export const UserItem = memo(({ user, onPress, onToggle, onDelete }: 
    { user: User; onPress: () => void; onToggle: (id: string) => void; onDelete: (id: string) => void }) => (
  <Pressable style={s.c} onPress={onPress}>
    <View style={s.i}>
      <Text style={s.n}>{user.name}</Text>
      <Text style={s.e}>{user.email}</Text>
      <Text style={s.r}>{user.role} • {user.active ? "Active" : "Inactive"}</Text>
    </View>
    <Pressable onPress={(e) => { e.stopPropagation(); onToggle(user.id); }} style={s.b}><Text>Toggle</Text></Pressable>
    <Pressable onPress={onPress} style={s.b}><Text>Edit</Text></Pressable>
    <Pressable onPress={(e) => { e.stopPropagation(); onDelete(user.id); }} style={s.b}><Text>Delete</Text></Pressable>
  </Pressable>
));

UserItem.displayName = "UserItem"

const s = StyleSheet.create({
  c: { flexDirection: "row", alignItems: "center", padding: 10, marginBottom: 6, backgroundColor: "#f9f9f9" },
  i: { flex: 1 },
  n: { fontWeight: "bold", fontSize: 15 },
  e: { color: "#666", fontSize: 12 },
  r: { fontSize: 11, color: "#999", marginTop: 2 },
  b: { padding: 8, justifyContent: "center", alignItems: "center", marginLeft: 4, backgroundColor: "#e5e5e5" },
});