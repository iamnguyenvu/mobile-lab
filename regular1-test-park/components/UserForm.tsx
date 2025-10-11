import { View, Text, TextInput } from "react-native";

export default function UserForm({
                                     name, id, klass,
                                     onChangeName, onChangeId, onChangeKlass,
                                 }: { name:string; id:string; klass:string;
    onChangeName:(s:string)=>void; onChangeId:(s:string)=>void; onChangeKlass:(s:string)=>void; }) {
    return (
        <View style={{ padding:12, margin:8, backgroundColor:"#fff", borderRadius:8 }}>
            <Text style={{ fontWeight:"700", fontSize:16, marginBottom:8 }}>Đặt bàn tại nhà hàng</Text>
            <TextInput placeholder="Họ và tên" value={name} onChangeText={onChangeName}
                       style={{ borderWidth:1, borderColor:"#ddd", borderRadius:6, padding:8, marginBottom:8 }} />
            <TextInput placeholder="Mã số sinh viên" value={id} onChangeText={onChangeId}
                       style={{ borderWidth:1, borderColor:"#ddd", borderRadius:6, padding:8, marginBottom:8 }} />
            <TextInput placeholder="Lớp" value={klass} onChangeText={onChangeKlass}
                       style={{ borderWidth:1, borderColor:"#ddd", borderRadius:6, padding:8 }} />
        </View>
    );
}
