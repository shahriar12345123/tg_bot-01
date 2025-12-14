import { useEffect, useState } from "react";

export default function Refer({ user }) {
  const [referralCount, setReferralCount] = useState(0);
  const API_URL = "tgbot-01server-production.up.railway.app/routes/user";

  const link = `https://t.me/@khonik_bot?start=${user.telegramId}`;

  useEffect(() => {
    const fetchReferral = async () => {
      try {
        const res = await fetch(`${API_URL}/${user.telegramId}`);
        const data = await res.json();
        setReferralCount(data.referralCount || 0);
      } catch (err) {
        console.error("Failed to fetch referral count:", err);
      }
    };

    fetchReferral();
  }, [user.telegramId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Refer & Earn</h2>
      <p className="mt-2 text-sm">Earn $0.25 per valid referral</p>
      <p className="mt-1 text-sm">Total Referrals: {referralCount}</p>
      <input
        value={link}
        readOnly
        className="mt-3 w-full p-2 bg-zinc-800 rounded"
      />
    </div>
  );
}
