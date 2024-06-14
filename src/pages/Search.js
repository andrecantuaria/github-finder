import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: { opacity: 0, y: "100vh" },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: "-100vh" }
  };
  
const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

function Search() {
    const [username, setUsername] = useState('');
    const [userFound, setUserFound] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const Search = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const apiUrl = `https://api.github.com/users/${username}`;
            const githubToken = process.env.REACT_APP_GITHUB_TOKEN;
            const options = { headers: { Authorization: `Bearer ${githubToken}` } };

            const response = await axios.get(apiUrl, options);

            if (response.data && response.data.login) {
                setUserFound(response.data);
                navigate(`/user/${username}`);
            } else {
                setUserFound(false);
            }
        } catch (error) {
            console.error('Error retrieving user:', error);
            setUserFound(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            >
            <div className="center">
                <i className="fa-brands fa-github github-logo mb-2"></i>
                <form onSubmit={Search}>
                    <input
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button type="submit" className="ml-1">Search</button>
                </form>
                {isLoading ? (
                    <p className='output mt-1'>Searching...</p>
                ) : userFound !== null ? (
                    userFound ? (
                        <div className='output mt-1'>
                            <p>User '{userFound.login}' found.</p>
                        </div>
                    ) : (
                        <div className='output mt-1'>
                            <p>User '{username}' not found.</p>
                        </div>
                    )
                ) : (
                    <p className='output mt-1'>Welcome to GitHub Finder</p>
                )}
            </div>
        </motion.div>
    );
}

export default Search;
