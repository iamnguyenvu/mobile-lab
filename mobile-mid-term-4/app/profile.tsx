import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={s.row}>
    <Text style={s.label}>{label}:</Text>
    <Text style={s.value}>{value}</Text>
  </View>
);

export default function Profile() {
  return (
    <SafeAreaView style={s.container}>
      <View style={s.card}>
        <Text style={s.title}>Thông tin sinh viên</Text>
        <Row label="Họ tên" value="Nguyễn Hoàng Nguyên Vũ" />
        <Row label="MSSV" value="22003185" />
        <Row label="Lớp" value="DHKTPM17B" />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { backgroundColor: "#fff", borderRadius: 8, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  row: { marginBottom: 12, borderBottomWidth: 1, borderBottomColor: "#eee", paddingBottom: 8 },
  label: { fontSize: 14, color: "#666", marginBottom: 4 },
  value: { fontSize: 16, fontWeight: "500" },
});
