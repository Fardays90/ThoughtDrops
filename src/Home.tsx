import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useUserStore } from '../hooks/useUserStore';
const Home = () => {
    const [username, setUsername] = useState("");
    const {changeUsername} = useUserStore();
    let ws = useRef<WebSocket | null>(null);
    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8080/');
    },[]);
    const handleJoin = () => {
        if(username){
            ws.current?.send(username);
            changeUsername(username);
        }
    }
    const handleJoinAnon = () => {
        username ? setUsername('') : null;
        ws.current?.send('Anonymous');
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-black text-white p-6 relative overflow-hidden">
            <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 1.5 }}
            />
            <motion.div 
                className="text-center z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    Thought Drops
                </h1>
                <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
                    Share your thoughts effortlessly. Join anonymously or with a username and start engaging with the world.
                </p>
            </motion.div>
            <motion.div 
                className="bg-[rgba(0,0,0,0.1)]  p-8 rounded-2xl shadow-xl text-center max-w-md w-full mt-10 backdrop-blur-md z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <input 
                    type="text" 
                    placeholder="Enter a username (optional)" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 rounded-md bg-[rgba(0,0,0,0.1)] backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
                />
                <div className="flex gap-4">
                    <button className="w-full bg-purple-400 hover:bg-purple-500 text-white font-medium p-3 rounded-lg" onClick={handleJoin}>
                        Enter with Name
                    </button>
                    <button className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium p-3 rounded-lg" onClick={handleJoinAnon}>
                        Enter Anonymously
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;
