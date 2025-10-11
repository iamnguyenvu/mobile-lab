import {Text, View} from "react-native";

export default function Screen() {
    return (
        <View style={{flex: 1}}>
            <View style={{
                height: 400,
                width: 600,
                maxHeight: 400,
                maxWidth: 600,
                padding: 20,
                backgroundColor: "lightblue",
                borderRadius: 6,
                margin: 20,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Text style={{fontWeight: "bold", color: "white", fontSize: 30}}>Screen</Text>
            </View>
        </View>
    )
}
