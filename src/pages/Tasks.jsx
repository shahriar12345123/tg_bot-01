import AdTaskCard from '../components/AdTaskCard';
import { saveUser } from '../utils/storage';


export default function Tasks({ user, setUser }) {
const DAILY_LIMIT = 50;
const PER_AD = 0.02;


const watchAd = () => {
if (user.todayAds >= DAILY_LIMIT) {
alert('Daily limit reached');
return;
}


setTimeout(() => {
const updated = {
...user,
todayAds: user.todayAds + 1,
balance: +(user.balance + PER_AD).toFixed(2)
};
saveUser(updated);
setUser(updated);
}, 30000);
};


return (
<div className="p-4">
<h2 className="text-xl font-bold">Tasks</h2>
<AdTaskCard onWatch={watchAd} remaining={DAILY_LIMIT - user.todayAds} />
</div>
);
}