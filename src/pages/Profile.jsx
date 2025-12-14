export default function Profile({ user }) {
return (
<div className="p-4">
<h2 className="text-xl font-bold">Profile</h2>
<p>Name: {user.name}</p>
<p>Telegram ID: {user.telegramId}</p>
</div>
);
}