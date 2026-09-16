import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import CarbonScannerPage from "./pages/CarbonScannerPage";
import WhatIfPage from "./pages/WhatIfPage";
import EcoAIChatbotPage from "./pages/EcoAIChatbotPage";
import EcoJourneyPage from "./pages/EcoJourneyPage";
import SettingsPage from "./pages/SettingsPage";

import {
  INITIAL_USER,
  INITIAL_BUDGET,
  IMPACT_CATEGORIES,
  INITIAL_ACTIVITIES
} from "./data/mockData";

export default function App() {
  // Navigation & Auth State
  const [activeTab, setActiveTab] = useState("auth");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // App Data (Persisted in localStorage)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("cw_user");
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("cw_budget");
    return saved ? JSON.parse(saved) : INITIAL_BUDGET;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("cw_categories");
    return saved ? JSON.parse(saved) : IMPACT_CATEGORIES;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem("cw_activities");
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem("cw_points");
    return saved ? parseInt(saved) : 145;
  });

  const [streak, setStreak] = useState(4);

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem("cw_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cw_budget", JSON.stringify(budget));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("cw_categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("cw_activities", JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem("cw_points", points.toString());
  }, [points]);

  // Activity Handlers
  const handleAddActivity = (newAct) => {
    setActivities((prev) => [newAct, ...prev]);

    // Recalculate budget used
    const addedKg = parseFloat(newAct.amountKg) || 0;
    setBudget((prev) => ({
      ...prev,
      usedKg: Math.round((prev.usedKg + addedKg) * 10) / 10,
    }));

    // Update categories
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.name.toLowerCase().includes(newAct.category.toLowerCase())) {
          return { ...cat, usedKg: Math.round((cat.usedKg + addedKg) * 10) / 10 };
        }
        return cat;
      })
    );
  };

  const handleDeleteActivity = (id) => {
    const actToDelete = activities.find((a) => a.id === id);
    if (!actToDelete) return;

    setActivities((prev) => prev.filter((a) => a.id !== id));
    const amountToSub = parseFloat(actToDelete.amountKg) || 0;

    setBudget((prev) => ({
      ...prev,
      usedKg: Math.max(0, Math.round((prev.usedKg - amountToSub) * 10) / 10),
    }));
  };

  const handleAddPoints = (amount) => {
    setPoints((prev) => prev + amount);
  };

  const handleResetData = () => {
    localStorage.clear();
    setUser(INITIAL_USER);
    setBudget(INITIAL_BUDGET);
    setCategories(IMPACT_CATEGORIES);
    setActivities(INITIAL_ACTIVITIES);
    setPoints(145);
    setActiveTab("dashboard");
  };

  // Auth Handlers
  const handleLoginSuccess = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
    setIsLoggedIn(true);
    setActiveTab("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("landing");
  };

  return (
    <div className="min-h-screen bg-[#FFF8E8] flex flex-col font-inter text-[#20251F]">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        points={points}
        onLogout={handleLogout}
        onNavigateAuth={() => setActiveTab("auth")}
        isLoggedIn={isLoggedIn}
      />

      {/* Main Body */}
      {activeTab === "landing" ? (
        <LandingPage
          onStartJourney={() => setActiveTab(isLoggedIn ? "dashboard" : "auth")}
          onExploreFeatures={() => setActiveTab("what-if")}
        />
      ) : activeTab === "auth" ? (
        <AuthPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar Navigation */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            user={user}
            onLogout={handleLogout}
          />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto min-h-[calc(100vh-65px)] pb-16">
            {activeTab === "dashboard" || activeTab === "my-carbon" ? (
              <DashboardPage
                user={user}
                budget={budget}
                categories={categories}
                activities={activities}
                onAddActivity={handleAddActivity}
                onDeleteActivity={handleDeleteActivity}
                onNavigateTab={setActiveTab}
              />
            ) : activeTab === "scanner" ? (
              <CarbonScannerPage onLogActivity={handleAddActivity} />
            ) : activeTab === "what-if" ? (
              <WhatIfPage />
            ) : activeTab === "ecoai" ? (
              <EcoAIChatbotPage user={user} budget={budget} activities={activities} />
            ) : activeTab === "journey" ? (
              <EcoJourneyPage
                points={points}
                streak={streak}
                onAddPoints={handleAddPoints}
              />
            ) : activeTab === "settings" ? (
              <SettingsPage
                user={user}
                budget={budget}
                onUpdateUser={setUser}
                onUpdateBudget={setBudget}
                onResetData={handleResetData}
              />
            ) : null}
          </main>
        </div>
      )}

    </div>
  );
}
