import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from "../firebase_config"
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Handle successful login
                const user = userCredential.user;
                console.log('User:', user);
                Cookies.set("auth", user.uid);
                Cookies.set("name", name);
                router.push('/');
            })
            .catch((error) => {
                // Handle login error
                alert(error.message)
                console.log('Error:', error);
            });
    };

    const handleSignInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((userCredential) => {
                // Handle successful login
                const user = userCredential.user;
                console.log('User:', user);
                Cookies.set("auth", user.uid);
                Cookies.set("name", name);
                router.push('/');
            })
            .catch((error) => {
                // Handle login error
                console.log('Error:', error);
            });
    };

    const handleSignInWithGitHub = () => {
        signInWithPopup(auth, githubProvider)
            .then((userCredential) => {
                // Handle successful login
                const user = userCredential.user;
                console.log('User:', user);
                Cookies.set("auth", user.uid);
                Cookies.set("name", name);
                router.push('/');
            })
            .catch((error) => {
                // Handle login error
                console.log('Error:', error);
            });
    };


    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className=''>Login</h1>
            <div className='bg-white p-6 rounded-lg shadow-md'>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                        Login In
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
                </div>
            </div>
        </div>
    );
};

export default Login;
