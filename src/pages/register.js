import { useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase_config";
import Cookies from "js-cookie";
import Link from "next/link"
import { useRouter } from "next/router"

const Register = () => {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleSignInWithGoogle = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);

            if (user) {
                const userData = {
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                };

                await addDoc(collection(db, "users"), {
                    ...userData,
                });

                setEmail("");
                setPassword("");
                setName("");
                setPhoneNumber("");
                Cookies.set("auth", user.uid);
                Cookies.set("name", name);
                router.push('/');
                console.log("User data stored in Firebase Realtime Database");
            }
        } catch (error) {
            alert(error.message)
            console.error("Error signing in:", error);
        }
    };

    const handleSignInWithGitHub = async () => {
        try {
            const auth = getAuth();
            const provider = new GithubAuthProvider();
            const { user } = await signInWithPopup(auth, provider);

            if (user) {
                const userData = {
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                };

                await addDoc(collection(db, "users"), {
                    ...userData,
                });

                setEmail("");
                setPassword("");
                setName("");
                setPhoneNumber("");
                Cookies.set("auth", user.uid);
                Cookies.set("name", name);
                router.push('/');
                console.log("User data stored in Firebase Realtime Database");
            }
        } catch (error) {
            alert(error.message)
            console.error("Error signing in:", error);
        }
    };

    const handleSignIn = async () => {
        try {
            const auth = getAuth();
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            if (user) {
                const userData = {
                    id: user.uid,
                    name,
                    email,
                    phoneNumber,
                };

                await addDoc(collection(db, "users"), {
                    ...userData,
                });

                setEmail("");
                setPassword("");
                setName("");
                setPhoneNumber("");
                Cookies.set("auth", user.uid);
                Cookies.set("name", name);
                router.push('/');
                console.log("User data stored in Firebase Realtime Database");
            }
        } catch (error) {
            alert(error.message)
            console.error("Error signing in:", error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className=''>Register</h1>
            <div className='bg-white p-6 rounded-lg shadow-md'>
                <input
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                />
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                />
                <input
                    type='tel'
                    placeholder='Phone Number'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className='w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                />
                {/* Sign In button */}
                <div className='flex flex-col'>
                    <button
                        onClick={handleSignIn}
                        className='bg-blue-500 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300 hover:bg-blue-600 mt-4'>
                        Register
                    </button>

                    {/* Sign In with Google button */}
                    <button
                        onClick={handleSignInWithGoogle}
                        className='bg-red-500 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300 hover:bg-red-600 mt-4'>
                        Sign In with Google
                    </button>

                    {/* Sign In with GitHub button */}
                    <button
                        onClick={handleSignInWithGitHub}
                        className='bg-gray-800 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300 hover:bg-gray-900 mt-4'>
                        Sign In with GitHub
                    </button>
                    <p className="mt-5">Already a User? <Link className="text-blue-600 text-decoration-line: underline"
                        href="/login">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
