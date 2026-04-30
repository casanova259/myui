"use client";

import React, { useState } from "react";
import Dashboard from "./dashboard/dashboard";
import Sidebar from "./dashboard/sidebar";

export const Dash = () => {

    const [activeNav, setActiveNav] = useState<NavId>("overview");

    // Collapsed state lives here so both Sidebar and Dashboard can react to it
    const [collapsed, setCollapsed] = useState(false);

    return (
        // <div className="h-screen flex items-center justify-center bg-gray-50">
        <div style={styles.layout}>
            <Sidebar
                activeNav={activeNav}
                onNavChange={setActiveNav}
                collapsed={collapsed}
                onToggle={() => setCollapsed((prev) => !prev)}
            />
            <Dashboard />
        </div>
    );
};


const styles: Record<string, React.CSSProperties> = {
    layout: {
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
    },
};