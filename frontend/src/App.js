import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import ParticlesBackground from "./components/ParticlesBackground";
import PageTransition from "./components/PageTransition";

import Task from "./Task";
import Leaderboard from "./Leaderboard";
import Profile from "./Profile";

import taskABI from "./contractABI.json";

const taskAddress = "0xb4133cE80dEAB48138f069523cD113aDE75C84B3"; // <-- Update after deploy!

function App() {
  const [account, setAccount] = useState(null);
  const [userXP, setUserXP] = useState(0);
  const navigate = useNavigate();

  // -------- WALLET CONNECT ----------
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask!");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  };

  // -------- GET XP ----------
  const loadXP = async () => {
    if (!account) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(taskAddress, taskABI, provider);

    const xpVal = await contract.xp(account);
    setUserXP(Number(xpVal));
  };

  useEffect(() => {
    loadXP();
  }, [account]);

  // -------- BADGE LEVEL LOGIC --------
  const getBadgeLevel = () => {
    if (userXP >= 100) return 4;
    if (userXP >= 50) return 3;
    if (userXP >= 20) return 2;
    if (userXP >= 1) return 1;
    return 0;
  };

  const level = getBadgeLevel();

  return (
    <div className="app">
      <ParticlesBackground />
      <NavBar account={account} connectWallet={connectWallet} />

      <Routes>
        <Route
          path="/"
          element={
            <PageTransition>
              <Hero
                account={account}
                connectWallet={connectWallet}
                userXP={userXP}
                level={level}
              />
              <HowItWorks />
            </PageTransition>
          }
        />

        <Route
          path="/tasks"
          element={
            <PageTransition>
              <Task account={account} refreshXP={loadXP} />
            </PageTransition>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <PageTransition>
              <Leaderboard />
            </PageTransition>
          }
        />

        <Route
          path="/profile"
          element={
            <PageTransition>
              <Profile account={account} userXP={userXP} level={level} />
            </PageTransition>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
