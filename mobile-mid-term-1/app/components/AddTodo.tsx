import { useCallback, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type AddTodoProps = {
    onAdd: (title: string) => Promise<void> | void;
};

/**
 * Component để thêm todo mới
 * Sử dụng: useRef, useState, useCallback
 */
export const AddTodo = ({ onAdd }: AddTodoProps) => {
    // State lưu giá trị input
    const [title, setTitle] = useState("");
    // State loading khi đang thêm todo
    const [adding, setAdding] = useState(false);
    // Ref để focus vào input sau khi thêm
    const inputRef = useRef<TextInput>(null);

    // useCallback: Memoize function để tránh re-create
    const handleAdd = useCallback(async () => {
        const trimmedTitle = title.trim();
        if (!trimmedTitle) return; // Không cho thêm nếu rỗng

        setAdding(true);
        try {
            await onAdd(trimmedTitle);
            setTitle(""); // Clear input sau khi thêm thành công
            inputRef.current?.focus(); // Focus lại input
        } finally {
            setAdding(false);
        }
    }, [onAdd, title]);

    return (
        <View style={styles.container}>
            <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Thêm công việc mới..."
                placeholderTextColor="#999"
                value={title}
                onChangeText={setTitle}
                onSubmitEditing={handleAdd} // Nhấn Enter để thêm
                returnKeyType="done"
                editable={!adding} // Disable khi đang thêm
            />
            <Pressable
                onPress={handleAdd}
                disabled={adding || !title.trim()}
                style={({ pressed }) => [
                    styles.button,
                    (adding || !title.trim()) && styles.buttonDisabled,
                    pressed && styles.buttonPressed,
                ]}
            >
                <Text style={styles.buttonText}>
                    {adding ? "..." : "Thêm"}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        gap: 8,
    },
    input: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#2196F3",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        minWidth: 70,
        alignItems: "center",
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
    },
    buttonPressed: {
        opacity: 0.7,
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },
});