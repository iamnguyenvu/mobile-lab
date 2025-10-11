import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api";
import { AddTodo } from "../components/AddTodo";
import { TodoItem } from "../components/TodoItem";
import type { Todo } from "../types";

// Main TodoScreen - Sử dụng: useState, useEffect, useCallback, useMemo
export const TodoScreen = ({ navigation }: any) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);

    // useCallback: Fetch todos
    const fetchTodos = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getTodos();
            setTodos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    // useEffect: Load data khi mount
    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    // useMemo: Tính stats
    const stats = useMemo(() => {
        const total = todos.length;
        const completed = todos.filter((t) => t.completed).length;
        return { total, completed, remaining: total - completed };
    }, [todos]);

    // Handler: Thêm todo
    const handleAdd = useCallback(async (title: string) => {
        try {
            const newTodo = await createTodo(title);
            setTodos((prev) => [newTodo, ...prev]);
        } catch (error) {
            console.error(error);
        }
    }, []);

    // Handler: Toggle completed (Optimistic update)
    const handleToggle = useCallback(async (id: string) => {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;

        setTodos((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));

        try {
            await updateTodo(id, { completed: !todo.completed });
        } catch {
            setTodos((prev) => prev.map((t) => t.id === id ? { ...t, completed: todo.completed } : t));
        }
    }, [todos]);

    // Handler: Xóa todo (Optimistic update, không confirm)
    const handleDelete = useCallback(async (id: string) => {
        const deletedTodo = todos.find((t) => t.id === id);
        setTodos((prev) => prev.filter((t) => t.id !== id));

        try {
            await deleteTodo(id);
        } catch {
            if (deletedTodo) setTodos((prev) => [...prev, deletedTodo]);
        }
    }, [todos]);

    // Handler: Navigate to Edit
    const handleEdit = useCallback((todo: Todo) => {
        navigation.navigate("Edit", { todo });
    }, [navigation]);

    // Render item
    const renderItem = useCallback(({ item }: { item: Todo }) => (
        <TodoItem todo={item} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
    ), [handleToggle, handleDelete, handleEdit]);

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Danh sách công việc</Text>
                <Text style={styles.stats}>
                    {stats.total} việc • {stats.completed} xong • {stats.remaining} còn lại
                </Text>
            </View>

            {/* Form thêm */}
            <AddTodo onAdd={handleAdd} />

            {/* List */}
            {loading && todos.length === 0 ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#2196F3" />
                </View>
            ) : todos.length === 0 ? (
                <View style={styles.center}>
                    <Text style={styles.emptyText}>Chưa có công việc nào</Text>
                </View>
            ) : (
                <FlatList
                    data={todos}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    onRefresh={fetchTodos}
                    refreshing={loading}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        backgroundColor: "#fff",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    stats: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#999",
    },
});