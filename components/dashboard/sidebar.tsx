import React from "react";
import { motion } from "motion/react"

// ── icons ──────────────────────────────────────────────────────────────────
const OverviewIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
);

const AnalyticsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
);

const UsersIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const ReportsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
    </svg>
);

const SettingsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
);

// Chevron arrow — flips direction based on collapsed state
const ChevronIcon = ({ collapsed }: { collapsed: boolean }) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{
            transition: "transform 0.3s ease",
            transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
        }}
    >
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

// ── types ──────────────────────────────────────────────────────────────────
export type NavId = "overview" | "analytics" | "users" | "reports" | "settings";

interface NavItem {
    id: NavId;
    label: string;
    icon: React.ReactNode;
}

interface SidebarProps {
    activeNav: NavId;
    onNavChange: (id: NavId) => void;
    collapsed: boolean;
    onToggle: () => void;
}

// ── data ───────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
    { id: "overview", label: "Overview", icon: <OverviewIcon /> },
    { id: "analytics", label: "Analytics", icon: <AnalyticsIcon /> },
    { id: "users", label: "Users", icon: <UsersIcon /> },
    { id: "reports", label: "Reports", icon: <ReportsIcon /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon /> },
];

const sidebarVariants = {
    hidden: {  opacity: 0 },
    visible: {
        x: 0, opacity: 1,
        transition: { duration: 0.3, ease: "easeInOut" }
    }
}
const containerVariants = {
    hidden: {},

    visible: { transition: { staggerChildren: 0.08 } }
}

const navItemVariants = {
    hidden: { y: -40, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: "easeInOut" }  // ← inside visible
    }
}
// ── component ──────────────────────────────────────────────────────────────
export default function Sidebar({ activeNav, onNavChange, collapsed, onToggle }: SidebarProps) {
    return (
        // 👇 Replace this aside with <motion.aside animate={{ width: collapsed ? 64 : 220 }}>
        <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            style={{
                ...styles.sidebar,
                width: collapsed ? 64 : 220,
                minWidth: collapsed ? 64 : 220,
            }}
        >
            {/* Logo + toggle button row */}
            <div style={styles.logoRow}>
                <div style={styles.logoIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>

                {!collapsed && <span style={styles.logoText}>Dashify</span>}

                {/* 👇 Toggle button — wrap with <motion.button whileTap={{ scale: 0.9 }}> */}
                <button style={styles.toggleBtn} onClick={onToggle} title="Toggle sidebar">
                    <ChevronIcon collapsed={collapsed} />
                </button>
            </div>

            {/* Nav links */}
            {/* 👇 Wrap with <motion.nav variants={containerVariants}> for stagger */}
            <motion.nav style={styles.nav} variants={containerVariants}>
                {NAV_ITEMS.map((item) => {
                    const isActive = item.id === activeNav;
                    return (
                        // 👇 Replace with <motion.div variants={navItemVariants}>
                        <motion.div
                            variants={navItemVariants}
                            key={item.id}
                            style={{
                                ...styles.navItem,
                                ...(isActive ? styles.navItemActive : {}),
                                justifyContent: collapsed ? "center" : "flex-start",
                            }}
                            onClick={() => onNavChange(item.id)}
                            title={collapsed ? item.label : undefined}
                        >
                            <span style={{ opacity: isActive ? 1 : 0.55, flexShrink: 0 }}>
                                {item.icon}
                            </span>
                            {!collapsed && <span>{item.label}</span>}
                        </motion.div>
                    );
                })}
            </motion.nav>

            {/* Footer user row */}
            <div style={{ ...styles.footer, margin: collapsed ? "0 8px" : "0 12px" }}>
                <div style={{ ...styles.userRow, justifyContent: collapsed ? "center" : "flex-start" }}>
                    <div style={styles.avatar}>AK</div>
                    {!collapsed && (
                        <div>
                            <div style={styles.userName}>Arjun K.</div>
                            <div style={styles.userRole}>Admin</div>
                        </div>
                    )}
                </div>
            </div>
        </motion.aside>
    );
}

// ── styles ─────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
    sidebar: {
        height: "100%",
        backgroundColor: "#f8f8f7",
        borderRight: "0.5px solid rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        padding: "20px 0",
        fontFamily: "'DM Sans', sans-serif",
        // 👇 CSS fallback transition — Framer Motion will override this
        transition: "width 0.3s ease, min-width 0.3s ease",
        overflow: "hidden",
    },
    logoRow: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "0 12px 24px",
    },
    logoIcon: {
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: "#534AB7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    logoText: {
        fontSize: 15,
        fontWeight: 500,
        color: "#111",
        flex: 1,
        whiteSpace: "nowrap" as const,
    },
    toggleBtn: {
        width: 28,
        height: 28,
        borderRadius: 6,
        border: "0.5px solid rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0,
        color: "#555",
        marginLeft: "auto",
    },
    nav: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "0 8px",
        flex: 1,
    },
    navItem: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 12px",
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 14,
        color: "#555",
        transition: "background 0.15s",
        whiteSpace: "nowrap" as const,
    },
    navItemActive: {
        backgroundColor: "#fff",
        color: "#111",
        fontWeight: 500,
        border: "0.5px solid rgba(0,0,0,0.1)",
    },
    footer: {
        padding: "16px 0 0",
        borderTop: "0.5px solid rgba(0,0,0,0.1)",
    },
    userRow: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: 8,
        borderRadius: 8,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: "50%",
        backgroundColor: "#1D9E75",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 500,
        color: "#fff",
        flexShrink: 0,
    },
    userName: {
        fontSize: 13,
        fontWeight: 500,
        color: "#111",
    },
    userRole: {
        fontSize: 11,
        color: "#888",
    },
};
