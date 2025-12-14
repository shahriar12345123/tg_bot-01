import { useEffect, useState } from "react";

export default function Profile({ user }) {
  const [profile, setProfile] = useState(user);
  const API_URL = "tgbot-01server-production.up.railway.app/routes/user";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/${user.telegramId}`);
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, [user.telegramId]);

  if (!profile) {
    return <div className="p-4">Loading profile...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Telegram ID: {profile.telegramId}</p>
      <p>Balance: ${profile.balance}</p>
      <p>Referral Count: {profile.referralCount}</p>
      <p>Referral Earnings: ${profile.referralEarnings}</p>
      <p>Today's Ads Watched: {profile.todayAds}</p>
    </div>
  );
}
