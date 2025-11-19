import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import taskABI from "./contractABI.json";
import "./Leaderboard.css";

const taskAddress = "YOUR_TASKREGISTRY_ADDRESS";

const Leaderboard = () => {
  const [rows, setRows] = useState([]);

  const loadLeaders = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(taskAddress, taskABI, provider);

    const players = await contract.getPlayers();
    const list = [];

    for (const addr of players) {
      const xpVal = await contract.xp(addr);
      list.push({ addr, xp: Number(xpVal) });
    }

    list.sort((a, b) => b.xp - a.xp);
    setRows(list);
  };

  useEffect(() => {
    loadLeaders();
  }, []);

  return (
    <section className="leader-page">
      <h2 className="title">Leaderboard</h2>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Wallet</th>
            <th>XP</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>#{i + 1}</td>
              <td>{r.addr.substring(0, 6)}...{r.addr.substring(r.addr.length - 4)}</td>
              <td>{r.xp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Leaderboard;
