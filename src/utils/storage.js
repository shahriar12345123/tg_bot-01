export const saveUser = (user) => {
localStorage.setItem(`user_${user.telegramId}`, JSON.stringify(user));
};


export const getUser = (telegramId) => {
const data = localStorage.getItem(`user_${telegramId}`);
return data ? JSON.parse(data) : null;
};


export const addReferral = (refId) => {
const refUser = getUser(refId);
if (!refUser) return;


refUser.referralCount += 1;
refUser.referralEarnings += 0.25;
refUser.balance += 0.25;


saveUser(refUser);
};