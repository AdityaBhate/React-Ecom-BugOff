import React from 'react'
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon,
} from "@heroicons/react/outline";
import Link from 'next/link';

function Header() {
    return (
        <header className="flex flex-col">
            {/* Top nav */}
            <div className="flex items-center bg-black p-1 flex-grow py-2">
                <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                    <MenuIcon />
                </div>
                {/* Search */}
                <div className="mx-3 mt-2 sm:flex items-center h-10 w-10 rounded-md flex-grow cursor-pointer bg-pink-400 hover:bg-green-500">
                    <input
                        className="h-full w-full flex-shrink rounded-l-md focus:outline-none px-2"
                        type="text"
                    />
                    <SearchIcon className="h-12 p-4" />
                </div>
                {/* Right */}
                <div className="text-white flex items-center text-xs space-x-3 sm:space-x-6 mx-2 sm:mx-6 whitespace-nowrap mt-2">
                    <div className="link">
                        <Link href="register">
                            <button className="bg-blue-500 h-10 w-20 text-white py-2 rounded-lg font-medium transition-colors duration-300 hover:bg-blue-600">
                                <p className="font-extrabold md:text-sm">Sign Up</p>
                            </button>
                        </Link>
                    </div>
                    <div className="relative link flex items-center">

                        <Link href="/cart">
                            <p className="hidden md:inline md:text-sm mt-2 mr-1">Cart</p>
                        </Link>
                        <ShoppingCartIcon className="h-7" />
                    </div>
                </div>
            </div>

            {/* Bottom nav */}
            {/* <div>
          <div className="flex items-center space-x-3 p-2 pl-6 bg-black text-white text-sm">
            <p className="link">Business</p>
            <p className="link hidden lg:inline-flex">Electronics</p>
            <p className="link hidden lg:inline-flex">Food & Grocery</p>
          </div>
        </div> */}
        </header>
    );
}

export default Header
