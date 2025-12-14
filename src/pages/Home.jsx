export default function Home({ user }) {
return (
<div className="p-4">
<h1 className="text-xl font-bold mb-4">Dashboard</h1>


<div className="grid grid-cols-2 gap-4">
<div className="bg-zinc-800 p-3 rounded">Balance<br/>${user.balance}</div>
<div className="bg-zinc-800 p-3 rounded">Today Ads<br/>{user.todayAds}/50</div>
<div className="bg-zinc-800 p-3 rounded">Referrals<br/>{user.referralCount}</div>
<div className="bg-zinc-800 p-3 rounded">Referral Earn<br/>${user.referralEarnings}</div>
</div>
</div>
);
}