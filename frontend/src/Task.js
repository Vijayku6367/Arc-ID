import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import taskABI from "./contractABI.json";
import "./Task.css";

const taskAddress = "YOUR_TASKREGISTRY_ADDRESS"; // UPDATE!

const Task = ({ account, refreshXP }) => {
  const [completed, setCompleted] = useState([false, false, false, false]);
  const [loading, setLoading] = useState(false);

  const executeTask = async (taskId) => {
    if (!account) return alert("Connect wallet first!");
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(taskAddress, taskABI, signer);

      const tx = await contract.completeTask(taskId);
      await tx.wait();

      setCompleted((prev) => {
        const arr = [...prev];
        arr[taskId - 1] = true;
        return arr;
      });

      refreshXP();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const tasks = [
    { id: 1, text: "Follow Arc on Twitter", link: "https://twitter.com" },
    { id: 2, text: "Join Arc Discord", link: "https://discord.gg" },
    { id: 3, text: "Follow Core Developers", link: "#" },
    { id: 4, text: "Complete Arc Identity Quiz", link: "#" },
  ];

  return (
    <section className="task-page">
      <h2 className="title">Arc Missions</h2>
      {tasks.map((t) => (
        <div key={t.id} className="task-card">
          <span>{t.text}</span>
          <button
            className="task-btn"
            disabled={completed[t.id - 1] || loading}
            onClick={() => executeTask(t.id)}
          >
            {completed[t.id - 1] ? "Completed" : "Complete"}
          </button>
        </div>
      ))}
    </section>
  );
};

export default Task;
