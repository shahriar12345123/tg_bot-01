import AdTaskCard from '../components/AdTaskCard';
import { useState } from 'react';

export default function Tasks({ user, setUser }) {
    const DAILY_LIMIT = 50;
    const PER_AD = 0.02;
    const API_URL = 'tgbot-01server-production.up.railway.app/user';

    const [isWatching, setIsWatching] = useState(false);

    const watchAd = async () => {
        if (user.todayAds >= DAILY_LIMIT) {
            alert('Daily limit reached');
            return;
        }

        setIsWatching(true);

        setTimeout(async () => {
            try {
                const updatedUser = {
                    todayAds: user.todayAds + 1,
                    balance: +(user.balance + PER_AD).toFixed(2),
                };

                // Backend update
                const res = await fetch(`${API_URL}/${user.telegramId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedUser),
                });
                const data = await res.json();

                // Update frontend state
                setUser(data);
            } catch (err) {
                console.error(err);
                alert('Failed to update user on server.');
            } finally {
                setIsWatching(false);
            }
        }, 20000); // 20s watch timer
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Tasks</h2>
            <AdTaskCard onWatch={watchAd} remaining={DAILY_LIMIT - user.todayAds} />
            {isWatching && <p className="mt-2 text-sm text-gray-400">Watching Ad... Please wait 30s</p>}
        </div>
    );
}
