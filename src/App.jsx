import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Refer from "./pages/Refer";
import Withdraw from "./pages/Withdraw";
import Profile from "./pages/Profile";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [tab, setTab] = useState("home");
  const [user, setUser] = useState(null);
  const API_URL = "tgbot-01server-production.up.railway.app/user";

  useEffect(() => {
    if (!window.Telegram?.WebApp) {
      console.error("Telegram WebApp not found");
      return;
    }

    const tg = window.Telegram.WebApp;
    tg.ready();

    const tgUser = tg.initDataUnsafe?.user;
    if (!tgUser) return;

    const startParam = tg.initDataUnsafe?.start_param;

    const fetchUser = async () => {
      try {
        // check if user exists in backend
        let res = await fetch(`${API_URL}/${tgUser.id}`);
        let data = await res.json();

        if (!data) {
          // create new user
          const newUser = {
            telegramId: tgUser.id,
            name: tgUser.first_name || "User",
            balance: 0,
            todayAds: 0,
            referralCount: 0,
            referralEarnings: 0,
            withdrawRequests: [],
            lastVisitDate: new Date().toDateString()
          };

          if (startParam) {
            newUser.startParam = startParam; // for backend referral logic
          }

          const createRes = await fetch(`${API_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          });

          data = await createRes.json();
        } else {
          // Daily reset logic
          const today = new Date().toDateString();
          if (data.lastVisitDate !== today) {
            const updatedUser = { ...data, todayAds: 0, lastVisitDate: today };
            const updateRes = await fetch(`${API_URL}/${data.telegramId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedUser),
            });
            data = await updateRes.json();
          }
        }

        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
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
