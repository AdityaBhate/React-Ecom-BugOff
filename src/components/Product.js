// import React from 'react';
// import { StarIcon } from '@heroicons/react/solid';
// import { useState } from 'react';
// import Currency from 'react-currency-formatter';

// const MAX_RATING = 5;
// const MIN_RATING = 1;

// const initialState = {
//     rating: Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING,
//     hasPrime: Math.random() < 0.5,
// };

// function Product({ id, title, price, description, category, image }) {
//     const [rating, setRating] = useState(initialState.rating);
//     const [hasPrime, setHasPrime] = useState(initialState.hasPrime);

//     return (
//         <div className="w-full md:w-80 mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//             <div className="relative h-56 md:h-2/5">
//                 {/* <Image src={image} layout="fill" objectFit="cover" /> */}
//                 <img src={image} alt={title} className="w-full h-full object-cover p-5" />
//             </div>
//             <div className="p-4 flex flex-col h-auto md:h-3/5">
//                 <p className="text-gray-500 uppercase text-xs mb-1 truncate">{category}</p>
//                 <h2 className="text-lg font-medium mb-1 truncate">{title}</h2>
//                 <div className="flex items-center mb-2">
//                     {Array(rating)
//                         .fill()
//                         .map((_, i) => (
//                             <StarIcon key={i} className="h-5 w-5 text-yellow-100" />
//                         ))}
//                 </div>
//                 <p className="text-gray-500 text-sm mb-2 line-clamp-2">{description}</p>
//                 <div className="flex items-center">
//                     <Currency quantity={price + 800} currency="INR" />
//                 </div>
//                 <button className="bg-blue-500 text-white py-2 rounded-lg font-medium transition-colors duration-300 hover:bg-blue-600 mt-auto">
//                     Add to Cart
//                 </button>
//             </div>
//         </div>
//     );

// }

// export default Product;

import { useState } from "react";
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Cookies from "js-cookie";
import { db } from "../firebase_config"

const ProductCard = ({ image, title, category, rating, description, price }) => {
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const handleAddToCart = async () => {

        const authCookie = Cookies.get("auth")
        if (authCookie) {
            try {
                const userId = authCookie;
                const productData = {
                    userId: userId,
                    title,
                    category,
                    rating: rating || "",
                    description,
                    price,
                    addedAt: serverTimestamp(),
                };
                await addDoc(collection(db, "products"), productData);

                setIsAddedToCart(true);
                console.log("Product added to cart successfully");
            } catch (error) {
                console.error("Error adding product to cart:", error);
            }
        } else {
            alert("User Not logged in!, Please Log in before shopping");
        }
    };

    return (
        <div className="w-full md:w-80 mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-56 md:h-2/5">
                <img src={image} alt={title} className="w-full h-full object-cover p-5" />
            </div>
            <div className="p-4 flex flex-col h-auto md:h-3/5">
                <p className="text-gray-500 uppercase text-xs mb-1 truncate">{category}</p>
                <h2 className="text-lg font-medium mb-1 truncate">{title}</h2>
                <div className="flex items-center mb-2">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p>⭐</p>
                        ))}
                </div>
                <p className="text-gray-500 text-sm mb-2 line-clamp-2">{description}</p>
                <div className="flex items-center">
                    <Currency quantity={price + 800} currency="INR" />
                </div>
                <button
                    className={`bg-blue-500 text-white py-2 rounded-lg font-medium transition-colors duration-300 ${isAddedToCart ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-600"
                        } mt-auto`}
                    onClick={handleAddToCart}
                    disabled={isAddedToCart}
                >
                    {isAddedToCart ? "Added to Cart" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
