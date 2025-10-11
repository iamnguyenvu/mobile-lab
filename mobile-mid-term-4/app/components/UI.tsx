import { useRouter } from "expo-router";
import { RefObject } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { s } from "./styles";

export const Header = () => {
  const router = useRouter();
  return (
    <View style={s.header}>
      <View style={s.spacer} />
      <Text style={s.headerTitle}>Note Taking App</Text>
      <TouchableOpacity onPress={() => router.push("/profile")} style={s.btn}>
        <Text style={s.btnText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Stats = ({ total, completed }: { total: number; completed: number }) => (
  <View style={s.statsBox}>
    {[
      { num: total, label: "Total" },
      { num: completed, label: "Completed" },
      { num: total - completed, label: "Pending" },
    ].map(({ num, label }) => (
      <View key={label} style={s.statItem}>
        <Text style={s.statNum}>{num}</Text>
        <Text style={s.statLabel}>{label}</Text>
      </View>
    ))}
  </View>
);

export const SearchBar = ({ value, onChange }: { value: string; onChange: (text: string) => void }) => (
  <TextInput placeholder="Tìm kiếm..." value={value} onChangeText={onChange} style={s.input} />
);

export const AddNote = ({ inputRef, value, onChange, onAdd }: { 
  inputRef: RefObject<TextInput | null>; 
  value: string; 
  onChange: (text: string) => void; 
  onAdd: () => void 
}) => (
  <View style={s.row}>
    <TextInput ref={inputRef} placeholder="Nhập công việc mới..." value={value} onChangeText={onChange} style={[s.input, s.flex]} />
    <TouchableOpacity onPress={onAdd} style={s.addBtn}>
      <Text style={s.addText}>+</Text>
    </TouchableOpacity>
  </View>
);
