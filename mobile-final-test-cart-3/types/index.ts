export interface Product {
    id: string,
    name: string,
    image: string,
    price: number
}

export interface CartItem extends Product {
    quantity: number
}