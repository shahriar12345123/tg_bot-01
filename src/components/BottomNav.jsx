export default function BottomNav({ setTab }) {
return (
<div className="fixed bottom-0 left-0 right-0 bg-zinc-900 flex justify-around py-3 border-t border-zinc-700">
<button onClick={() => setTab('home')}>Home</button>
<button onClick={() => setTab('tasks')}>Tasks</button>
<button onClick={() => setTab('refer')}>Refer</button>
<button onClick={() => setTab('withdraw')}>Withdraw</button>
<button onClick={() => setTab('profile')}>Profile</button>
</div>
);
}