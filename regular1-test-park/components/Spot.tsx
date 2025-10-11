import { TouchableOpacity, View, Text } from "react-native";

export default function Spot({
                                 n, booked, locked, onPress,
                             }: { n:number; booked:boolean; locked:boolean; onPress:()=>void }) {
    const bg = booked ? "#ef4444" : "#22c55e";
    return (
        <TouchableOpacity onPress={onPress} style={{ margin: 6, opacity: locked ? 0.6 : 1 }}>
            <View style={{ width:60, height:60, borderRadius:30, backgroundColor: booked ? "#ef4444" : "#22c55e",
                alignItems:"center", justifyContent:"center" }}>
                <Text style={{ color:"#fff", fontWeight:"700" }}>{n}</Text>
            </View>
        </TouchableOpacity>
    );
}
