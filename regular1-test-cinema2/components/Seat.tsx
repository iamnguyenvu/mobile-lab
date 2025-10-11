import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

interface SeatProps {
    title: string,
    isSelected: boolean,
    onPress?: () => void,
}

export default function Seat({title, isSelected, onPress}: SeatProps) {
    return (
        <TouchableOpacity
            style={[styles.seat, isSelected && styles.selected]}
            onPress={onPress}
        >
            <Text style={[styles.title]}>{title}</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    seat: {
        width: 40,
        height: 40,
        margin: 4,
        borderRadius: 6,
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center"
    },
    selected: {
        backgroundColor: "red",
    },
    title: {
        fontWeight: "bold",
        color: "white"
    }
})
