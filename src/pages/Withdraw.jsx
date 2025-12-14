import WithdrawModal from '../components/WithdrawModal';
import { useState } from 'react';

export default function Withdraw({ user, setUser }) {
    const amounts = [10, 25, 50, 100, 500];
    const API_URL = "tgbot-01server-production.up.railway.app/routes/withdraw";
    const USER_API_URL = "tgbot-01server-production.up.railway.app/models/user";

    const [loading, setLoading] = useState(false);

    const handleWithdraw = async (amount, address) => {
        if (user.balance < amount) {
            alert('Insufficient balance');
            return;
        }

        setLoading(true);
        try {
            // 1️⃣ Create withdraw request in backend
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    telegramId: user.telegramId,
                    amount,
                    address
                }),
            });

            const data = await res.json();

            if (res.ok) {
                // 2️⃣ Update frontend state with new balance and request
                const updatedUser = {
                    ...user,
                    balance: +(user.balance - amount).toFixed(2),
                    withdrawRequests: [...user.withdrawRequests, data.withdraw]
                };

                setUser(updatedUser);

                // 3️⃣ Optional: Update user in backend for frontend sync
                await fetch(`${USER_API_URL}/${user.telegramId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ balance: updatedUser.balance, withdrawRequests: updatedUser.withdrawRequests }),
                });

                alert('Withdraw request submitted successfully!');
            } else {
                alert(data.error || 'Failed to create withdraw request');
            }
        } catch (err) {
            console.error(err);
            alert('Server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Withdraw</h2>
            <p className="mb-3">Balance: ${user.balance}</p>

            <div className="grid grid-cols-2 gap-3">
                {amounts.map(a => (
                    <WithdrawModal
                        key={a}
                        amount={a}
                        onConfirm={(address) => handleWithdraw(a, address)}
                        disabled={loading}
                    />
                ))}
            </div>

            {loading && <p className="mt-2 text-sm text-gray-400">Processing withdraw...</p>}
        </div>
    );
}
