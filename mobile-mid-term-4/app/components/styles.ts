import { StyleSheet } from "react-native";

const c = { primary: "#007AFF", white: "#fff", bg: "#f5f5f5", gray: "#666", done: "#999" };

export const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: c.bg },
  center: { flex: 1, justifyContent: "center" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, backgroundColor: c.primary },
  spacer: { width: 80 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: c.white, textAlign: "center" },
  btn: { backgroundColor: c.white, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  btnText: { fontSize: 14, color: c.primary, fontWeight: "600" },
  statsBox: { flexDirection: "row", backgroundColor: c.white, margin: 12, marginBottom: 0, padding: 12, borderRadius: 8 },
  statItem: { flex: 1, alignItems: "center" },
  statNum: { fontSize: 24, fontWeight: "bold", color: c.primary },
  statLabel: { fontSize: 12, color: c.gray, marginTop: 4 },
  input: { margin: 12, padding: 12, backgroundColor: c.white, borderRadius: 8 },
  row: { flexDirection: "row", marginHorizontal: 12 },
  flex: { flex: 1, margin: 0, marginRight: 8 },
  addBtn: { width: 50, backgroundColor: c.primary, borderRadius: 8, justifyContent: "center", alignItems: "center" },
  addText: { fontSize: 24, color: c.white },
  card: { flexDirection: "row", backgroundColor: c.white, padding: 12, borderRadius: 8, marginBottom: 8, marginHorizontal: 12, alignItems: "center" },
  check: { fontSize: 20, marginRight: 12 },
  title: { flex: 1, fontSize: 16 },
  done: { textDecorationLine: "line-through", color: c.done },
  link: { fontSize: 14, color: c.primary, marginLeft: 12, fontWeight: "600" },
  edit: { flex: 1, borderBottomWidth: 1, borderColor: c.primary, padding: 4 },
  list: { paddingBottom: 12 },
});
