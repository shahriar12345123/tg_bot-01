export default function AdTaskCard({ onWatch, remaining }) {
return (
<div className="bg-zinc-800 p-4 rounded-lg mt-4">
<h3 className="text-lg font-semibold">Watch Ad</h3>
<p className="text-sm text-gray-400">Remaining today: {remaining}</p>
<button
onClick={onWatch}
className="mt-3 w-full bg-green-600 py-2 rounded"
>
Watch (30s)
</button>
</div>
);
}