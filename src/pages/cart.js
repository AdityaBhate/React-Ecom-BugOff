import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from "../firebase_config"
import Cookies from 'js-cookie';

function Cart() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            // Check if user is authenticated
            const user = Cookies.get('auth');
            if (!user) {
                // Redirect to login page if user is not authenticated
                router.push('/login');
                return;
            }

            // Fetch cart items for the authenticated user
            const cartQuery = query(collection(db, 'products'), where('userId', '==', user));
            const cartSnapshot = await getDocs(cartQuery);

            const cartData = [];
            let totalPrice = 0;

            cartSnapshot.forEach((doc) => {
                const product = doc.data();
                cartData.push({ id: doc.id, ...product });
                totalPrice += product.price;
            });

            setCartItems(cartData);
            setTotalPrice(totalPrice);
        };

        fetchData();
    }, [router]);

    const handleDeleteItem = async (itemId) => {
        try {
            // Delete the item from the database
            await deleteDoc(doc(db, 'products', itemId));

            // Update the UI by removing the deleted item from the cartItems state
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

            // Update the total price
            const updatedTotalPrice = cartItems.reduce((total, item) => total + item.price, 0);
            setTotalPrice(updatedTotalPrice);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Cart 🛒</h1>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td className="border px-4 py-2">{item.title}</td>
                                <td className="border px-4 py-2">${item.price}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="bg-red-500 text-white py-1 px-2 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="text-xl mt-4">Total Price: ${totalPrice}</p>
            </div>
        </div>
    );
}

export default Cart;