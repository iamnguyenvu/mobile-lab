import { FlatList, View } from "react-native";
import Spot from "./Spot";

export default function SpotGrid({
                                     booked, locked, onToggle,
                                 }: { booked:Set<number>; locked:Set<number>; onToggle:(n:number)=>void }) {
    const data = Array.from({ length:20 }, (_,i)=> i+1);
    return (
        <View style={{ backgroundColor:"#fff", borderRadius:8, margin:8, padding:8 }}>
            <FlatList
                data={data} keyExtractor={String} numColumns={5}
                columnWrapperStyle={{ justifyContent:"space-between" }}
                renderItem={({ item }) => (
                    <Spot n={item} booked={booked.has(item)} locked={locked.has(item)}
                          onPress={() => onToggle(item)} />
                )}
            />
        </View>
    );
}
