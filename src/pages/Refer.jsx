export default function Refer({ user }) {
const link = `https://t.me/@khonik_bot?start=${user.telegramId}`;


return (
<div className="p-4">
<h2 className="text-xl font-bold">Refer & Earn</h2>
<p className="mt-2 text-sm">Earn $0.25 per valid referral</p>
<input
value={link}
readOnly
className="mt-3 w-full p-2 bg-zinc-800 rounded"
/>
</div>
);
}