import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type CartItem = { id: string; name: string; price: number; quantity: number };

type CartCtx = {
    items: Record<string, CartItem>;
    addToCart: (p: { id: string; name: string; price: number }, qty?: number) => void;
    removeFromCart: (id: string) => void;
    setQuantity: (id: string, qty: number) => void;
    clearCart: () => void;
    totalQuantity: number;
    totalPrice: number;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Record<string, CartItem>>({});

    const addToCart = (p: { id: string; name: string; price: number }, qty = 1) =>
        setItems(prev => {
            const q = Math.max(1, Math.floor(qty));
            const curr = prev[p.id];
            return { ...prev, [p.id]: { ...p, quantity: (curr?.quantity ?? 0) + q } };
        });

    const removeFromCart = (id: string) =>
        setItems(prev => {
            const { [id]: _, ...rest } = prev;
            return rest;
        });

    const setQuantity = (id: string, qty: number) =>
        setItems(prev => {
            const q = Math.floor(qty);
            if (q <= 0) {
                const { [id]: _, ...rest } = prev;
                return rest;
            }
            const it = prev[id];
            if (!it) return prev;
            return { ...prev, [id]: { ...it, quantity: q } };
        });

    const clearCart = () => setItems({});

    const { totalQuantity, totalPrice } = useMemo(() => {
        const list = Object.values(items);
        return {
            totalQuantity: list.reduce((s, i) => s + i.quantity, 0),
            totalPrice: list.reduce((s, i) => s + i.quantity * i.price, 0),
        };
    }, [items]);

    return (
        <CartContext.Provider
            value={{ items, addToCart, removeFromCart, setQuantity, clearCart, totalQuantity, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart() must be used within <CartProvider>");
    return ctx;
};
