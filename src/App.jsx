// import { useEffect, useState } from 'react';
// import Home from './pages/Home';
// import Tasks from './pages/Tasks';
// import Refer from './pages/Refer';
// import Withdraw from './pages/Withdraw';
// import Profile from './pages/Profile';
// import BottomNav from './components/BottomNav';
// import { getUser, saveUser } from './utils/storage.js';


// export default function App() {
// const [tab, setTab] = useState('home');
// const [user, setUser] = useState(null);


// useEffect(() => {
//   const startParam = tg.initDataUnsafe?.start_param;


// if (startParam && !existing) {
// addReferral(startParam);
// }
// const tg = window.Telegram.WebApp;
// tg.ready();


// const tgUser = tg.initDataUnsafe?.user;
// if (!tgUser) return;


// const existing = getUser(tgUser.id);


// if (existing) {
// setUser(existing);
// } else {
// const newUser = {
// telegramId: tgUser.id,
// name: tgUser.first_name,
// balance: 0,
// todayAds: 0,
// referralCount: 0,
// referralEarnings: 0,
// withdrawRequests: []
// };
// saveUser(newUser);
// setUser(newUser);
// }
// }, []);


// if (!user) return <div className="text-white">Loading...</div>;


// return (
// <div className="bg-black text-white min-h-screen pb-20">
// {tab === 'home' && <Home user={user} />}
// {tab === 'tasks' && <Tasks user={user} setUser={setUser} />}
// {tab === 'refer' && <Refer user={user} />}
// {tab === 'withdraw' && <Withdraw user={user} setUser={setUser} />}
// {tab === 'profile' && <Profile user={user} />}
// <BottomNav setTab={setTab} />
// </div>
// );
// }



import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Refer from "./pages/Refer";
import Withdraw from "./pages/Withdraw";
import Profile from "./pages/Profile";
import BottomNav from "./components/BottomNav";

import { getUser, saveUser } from "./utils/storage.js";
// import { addReferral } from "./utils/referral"; // যদি আলাদা ফাইল থাকে

export default function App() {
  const [tab, setTab] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Telegram context check
    if (!window.Telegram?.WebApp) {
      console.error("Telegram WebApp not found");
      return;
    }

    const tg = window.Telegram.WebApp;
    tg.ready();

    const tgUser = tg.initDataUnsafe?.user;
    if (!tgUser) return;

    const startParam = tg.initDataUnsafe?.start_param;

    // ✅ check user from local storage
    const existingUser = getUser(tgUser.id);

    if (existingUser) {
      setUser(existingUser);
    } else {
      const newUser = {
        telegramId: tgUser.id,
        name: tgUser.first_name || "User",
        balance: 0,
        todayAds: 0,
        referralCount: 0,
        referralEarnings: 0,
        withdrawRequests: []
      };

      // ✅ referral ONLY for new user
      if (startParam) {
        addReferral(startParam);
      }

      saveUser(newUser);
      setUser(newUser);
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen pb-20">
      {tab === "home" && <Home user={user} />}
      {tab === "tasks" && <Tasks user={user} setUser={setUser} />}
      {tab === "refer" && <Refer user={user} />}
      {tab === "withdraw" && <Withdraw user={user} setUser={setUser} />}
      {tab === "profile" && <Profile user={user} />}

      <BottomNav setTab={setTab} />
    </div>
  );
}
