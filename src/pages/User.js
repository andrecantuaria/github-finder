import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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

function User() {
    const { username } = useParams();
    const [userData, setUserData] = useState({});
    const [repoData, setRepoData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const apiUrlUser = `https://api.github.com/users/${username}`;
                const githubToken = process.env.REACT_APP_GITHUB_TOKEN;
                const options = { headers: { Authorization: `Bearer ${githubToken}` } };

                const responseUser = await axios.get(apiUrlUser, options);
                setUserData(responseUser.data);

                const apiUrlRepos = `https://api.github.com/users/${username}/repos`;
                const responseRepos = await axios.get(apiUrlRepos, options);
                setRepoData(responseRepos.data);
            } catch (error) {
                console.error('Error retrieving user/repository information:', error);
            }
        };

        fetchUserData();
    }, [username]);

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            >
            <div className="user-container mt-3 mb-3">
                <div className="user-avatar mb-1" style={{ backgroundImage: `url(${userData.avatar_url})` }}></div>
                <div className="user-name">{userData.name}</div>
                
                <div className="stats-container">
                    <div className="stats-row">
                        <div className="stats-item">
                            <div className="stats-count">{userData.public_repos}</div>
                            <div className="stats-count-label">Repositories</div>
                        </div>
                        <div className="stats-item">
                            <div className="stats-count">{userData.followers}</div>
                            <div className="stats-count-label">Followers</div>
                        </div>
                        <div className="stats-item">
                            <div className="stats-count">{userData.following}</div>
                            <div className="stats-count-label">Following</div>
                        </div>
                    </div>
                </div>

                <button className="mt-1" onClick={() => window.open(userData.html_url, '_blank')}>Go to GitHub</button>
            </div>

            {repoData.map(repo => (
                <div key={repo.id} className="repo-container">
                    <div className="repo-row">
                        <a href={repo.html_url} target="_blank">{repo.name}</a>
                        <p>{repo.description}</p>
                        <p className="last-update">Updated at: {new Date(repo.updated_at).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}
        </motion.div>
    );
}

export default User;
