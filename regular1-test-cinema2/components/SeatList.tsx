import {FlatList, StyleSheet, Text, View} from "react-native";
import {useState} from "react";
import Seat from "@/components/Seat";

interface SeatListProps {
    seats: string[];
}

export default function SeatList({seats}: SeatListProps) {
    const [selectedSeat, setSelectedSeat] = useState<string[]>([]);

    const toggleSeat = (selected: string) => {
        setSelectedSeat((prev) => (
            prev.includes(selected) ?
                prev.filter(id => id !== selected)
                : [...prev, selected]
        ))
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={seats}
                renderItem={({item}) => (
                    <Seat title={item} isSelected={selectedSeat.includes(item)} onPress={() => toggleSeat(item)}/>
                )}
                keyExtractor={item => item}
                numColumns={8}
                style={{flex:1}}
            />
            <View style={styles.textWrapper}>
                <Text style={styles.textInfo}>Tong so ghe: {seats.length}</Text>
                <Text style={styles.textInfo}>So ghe da duoc dat: {selectedSeat.length}</Text>
                <Text style={styles.textInfo}>So ghe con lai: {seats.length - selectedSeat.length}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textWrapper: {
        flex: 1,
        alignItems: "flex-end"
    },
    textInfo: {
        fontSize: 20,
        fontWeight: "bold",
    }
})
