import React from "react";
import "./Profile.css";

const Profile = ({ account, userXP, level }) => {
  return (
    <section className="profile-page">
      <h2 className="title">Your Profile</h2>

      {!account ? (
        <p className="info">Connect wallet to view profile</p>
      ) : (
        <>
          <p className="walletTag">
            Wallet: {account.substring(0, 6)}...
            {account.substring(account.length - 4)}
          </p>

          <div className="xp-box">
            <span className="xp-text">{userXP} XP</span>
            <span className="level-text">Badge Level {level}</span>
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
