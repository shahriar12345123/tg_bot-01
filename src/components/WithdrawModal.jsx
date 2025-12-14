export default function WithdrawModal({ amount, onConfirm }) {
const submit = () => {
const address = prompt('Enter USDT (BEP20) Address');
if (!address) return;
onConfirm(address);
};


return (
<button
onClick={submit}
className="bg-blue-600 p-2 rounded"
>
${amount}
</button>
);
}