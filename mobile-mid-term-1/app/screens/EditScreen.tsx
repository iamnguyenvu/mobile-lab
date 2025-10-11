import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateTodo } from "../api";
import type { Todo } from "../types";

/**
 * EditScreen - Màn hình chỉnh sửa todo
 * Sử dụng: useState, useEffect, useRef, useCallback
 */
export const EditScreen = ({ route, navigation }: any) => {
    // Lấy todo từ navigation params
    const { todo } = route.params as { todo: Todo };
    
    // State lưu title mới
    const [title, setTitle] = useState(todo.title);
    // State saving để tránh double submit
    const [saving, setSaving] = useState(false);
    // useRef: Lưu reference đến TextInput
    const inputRef = useRef<TextInput>(null);

    /**
     * useEffect: Focus vào input khi màn hình load
     */
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    /**
     * useCallback: Handler lưu todo
     */
    const onSave = useCallback(async () => {
        const trimmedTitle = title.trim();

        // Validation: Không cho phép title rỗng
        if (!trimmedTitle) {
            Alert.alert("Lỗi", "Nội dung công việc không được để trống");
            return;
        }

        // Nếu không thay đổi gì thì quay lại
        if (trimmedTitle === todo.title) {
            navigation.goBack();
            return;
        }

        // Tránh double submit
        if (saving) return;

        setSaving(true);
        try {
            await updateTodo(todo.id, { title: trimmedTitle });
            Alert.alert("Thành công", "Đã cập nhật công việc", [
                {
                    text: "OK",
                    onPress: () => navigation.goBack(),
                },
            ]);
        } catch (error) {
            Alert.alert("Lỗi", "Không thể cập nhật công việc");
            console.error(error);
        } finally {
            setSaving(false);
        }
    }, [title, todo.id, todo.title, saving, navigation]);

    /**
     * Handler hủy - quay về màn hình trước
     */
    const onCancel = useCallback(() => {
        // Kiểm tra có thay đổi không
        if (title.trim() !== todo.title) {
            Alert.alert(
                "Xác nhận",
                "Bạn có những thay đổi chưa lưu. Bạn có chắc muốn hủy?",
                [
                    { text: "Ở lại", style: "cancel" },
                    { text: "Hủy", style: "destructive", onPress: () => navigation.goBack() },
                ]
            );
        } else {
            navigation.goBack();
        }
    }, [title, todo.title, navigation]);

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <View style={styles.content}>
                {/* Label */}
                <Text style={styles.label}>Nội dung công việc</Text>

                {/* TextInput */}
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    onSubmitEditing={onSave}
                    returnKeyType="done"
                    placeholder="Nhập nội dung..."
                    placeholderTextColor="#999"
                    multiline
                    numberOfLines={3}
                    editable={!saving}
                />

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    {/* Nút Hủy */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            styles.cancelButton,
                            pressed && styles.buttonPressed,
                        ]}
                        onPress={onCancel}
                        disabled={saving}
                    >
                        <Text style={[styles.buttonText, styles.cancelText]}>
                            Hủy
                        </Text>
                    </Pressable>

                    {/* Nút Lưu */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            styles.saveButton,
                            saving && styles.buttonDisabled,
                            pressed && styles.buttonPressed,
                        ]}
                        onPress={onSave}
                        disabled={saving}
                    >
                        <Text style={styles.buttonText}>
                            {saving ? "Đang lưu..." : "Lưu"}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    content: {
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        minHeight: 100,
        textAlignVertical: "top",
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 12,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    saveButton: {
        backgroundColor: "#2196F3",
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
    },
    buttonPressed: {
        opacity: 0.7,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
    cancelText: {
        color: "#666",
    },
});