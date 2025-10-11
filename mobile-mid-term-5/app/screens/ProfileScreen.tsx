import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={s.c}>
      <View style={s.p}>
        <Text style={s.t}>Thông Tin Sinh Viên</Text>
        <View style={s.card}>
          <View style={s.row}><Text>Họ tên:</Text>
          <Text>Nguyễn Hoàng Nguyên Vũ</Text></View>
          <View style={s.row}><Text>MSSV:</Text><Text>22003185</Text></View>
          <View style={s.row}><Text>Lớp:</Text><Text>DH22CS01</Text></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: '#f5f5f5' },
  p: { padding: 16 },
  t: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 4, padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, 
    borderBottomWidth: 1, borderBottomColor: '#eee' },
});

