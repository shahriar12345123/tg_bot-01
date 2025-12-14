import WithdrawModal from '../components/WithdrawModal';
import { saveUser } from '../utils/storage';


export default function Withdraw({ user, setUser }) {
const amounts = [10, 25, 50, 100, 500];


const handleWithdraw = (amount, address) => {
if (user.balance < amount) {
alert('Insufficient balance');
return;
}


const updated = {
...user,
balance: user.balance - amount,
withdrawRequests: [...user.withdrawRequests, { amount, address, status: 'pending' }]
};


saveUser(updated);
setUser(updated);
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
/>
))}
</div>
</div>
);
}