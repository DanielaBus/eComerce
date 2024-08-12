import React, { useState } from "react";
import "../App.css"; // Importa el archivo CSS para los estilos
import Product from "../components/Product";

// Componente principal que maneja la lista de productos y el carrito
export default function ProductList() {
    const [cart, setCart] = useState([]);

    const products = [
        { id: 1, name: "Jordan 1 low", price: 10, image: "/images/product.jpg" },
        { id: 2, name: "Producto 2", price: 20, image: "/images/product.jpg" },
        { id: 3, name: "Producto 3", price: 30, image: "/images/product.jpg" },
        { id: 4, name: "Producto 4", price: 40, image: "/images/product.jpg" },
        { id: 5, name: "Producto 5", price: 50, image: "/images/product.jpg" },
    ];

    const handleAddToCart = (product) => {
        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // Función para eliminar un artículo del carrito
    const handleRemoveFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    // Calcular el total del carrito sumando los precios de los productos multiplicados por sus cantidades
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div>
            <h1>Catálogo de Productos</h1>
            <div className="product-list">
                {products.map((product) => (
                    <Product
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>

            <h2>Carrito</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price} x {item.quantity}
                        <button onClick={() => handleRemoveFromCart(item.id)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>

            {/* Sección para mostrar el total del carrito */}
            <h2>Total Carrito</h2>
            <p>${total.toFixed(2)}</p>
        </div>
    );
}
