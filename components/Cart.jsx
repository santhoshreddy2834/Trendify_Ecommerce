import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-orange-400 mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-400">Your cart is empty. Add some products to continue shopping.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-xl shadow-md p-4 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              {/* Left: Image + Info */}
              <div className="flex items-center gap-4 w-full md:w-2/3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-orange-600 font-semibold mt-1">₹{item.price}</p>
                </div>
              </div>

              {/* Right: Quantity + Remove */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, Math.max(1, item.quantity - 1))
                    }
                    className="bg-gray-300 text-black px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="px-2 font-medium">{item.quantity || 1}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity + 1 || 2)
                    }
                    className="bg-gray-300 text-black px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="bg-white text-black rounded-xl p-4 shadow-md mt-8">
            <h2 className="text-xl font-bold">
              Total: ₹{getTotal().toLocaleString()}
            </h2>
            <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
