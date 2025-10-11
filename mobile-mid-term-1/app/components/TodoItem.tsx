import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Todo } from "../types";

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: string) => Promise<void> | void;
    onDelete: (id: string) => Promise<void> | void;
    onEdit: (todo: Todo) => void; // Fix: nhận todo thay vì id
};

/**
 * Component hiển thị 1 todo item
 * memo: Tránh re-render nếu props không đổi
 */
export const TodoItem = memo(
    ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
        return (
            <View style={styles.container}>
                {/* Pressable để toggle completed */}
                <Pressable 
                    style={styles.todoContent}
                    onPress={() => onToggle(todo.id)}
                >
                    {/* Checkbox custom */}
                    <View style={[
                        styles.checkbox,
                        todo.completed && styles.checkboxCompleted
                    ]} />

                    {/* Title với gạch ngang nếu completed */}
                    <Text style={[
                        styles.title,
                        todo.completed && styles.titleCompleted
                    ]}>
                        {todo.title}
                    </Text>
                </Pressable>

                {/* Nút Edit */}
                <Pressable 
                    style={({ pressed }) => [
                        styles.actionButton,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={() => onEdit(todo)}
                >
                    <Text style={styles.actionText}>Sửa</Text>
                </Pressable>

                {/* Nút Delete */}
                <Pressable 
                    style={({ pressed }) => [
                        styles.actionButton,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={() => onDelete(todo.id)}
                >
                    <Text style={styles.deleteText}>Xóa</Text>
                </Pressable>
            </View>
        );
    }
);

TodoItem.displayName = "TodoItem";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        marginHorizontal: 16,
        marginVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    todoContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#999",
        marginRight: 12,
    },
    checkboxCompleted: {
        backgroundColor: "#4CAF50",
        borderColor: "#4CAF50",
    },
    title: {
        fontSize: 16,
        color: "#333",
        flex: 1,
    },
    titleCompleted: {
        textDecorationLine: "line-through",
        color: "#999",
    },
    actionButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    actionText: {
        fontSize: 14,
        color: "#2196F3",
    },
    deleteText: {
        fontSize: 14,
        color: "#f44336",
    },
    buttonPressed: {
        opacity: 0.5,
    },
});
