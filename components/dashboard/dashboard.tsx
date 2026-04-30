import React from "react";

// ── types ──────────────────────────────────────────────────────────────────
interface StatCardProps {
    label: string;
    value: string;
    change: string;
    changeColor?: string;
}

interface BarRowProps {
    label: string;
    percent: number;
    color: string;
}

interface ActivityItem {
    text: string;
    time: string;
    dotColor: string;
}

// ── sub-components ─────────────────────────────────────────────────────────

// 👇 Each StatCard — wrap with <motion.div variants={cardVariants}> to animate
function StatCard({ label, value, change, changeColor = "#1D9E75" }: StatCardProps) {
    return (
        <div style={styles.statCard}>
            <div style={styles.statLabel}>{label}</div>
            <div style={styles.statValue}>{value}</div>
            <div style={{ ...styles.statChange, color: changeColor }}>{change}</div>
        </div>
    );
}

function BarRow({ label, percent, color }: BarRowProps) {
    return (
        <div style={styles.barRow}>
            <span style={styles.barLabel}>{label}</span>
            <div style={styles.barTrack}>
                <div style={{ ...styles.barFill, width: `${percent}%`, backgroundColor: color }} />
            </div>
            <span style={styles.barNum}>{percent}%</span>
        </div>
    );
}

function ActivityRow({ text, time, dotColor }: ActivityItem) {
    return (
        <div style={styles.activityRow}>
            <div style={{ ...styles.dot, backgroundColor: dotColor }} />
            <div>
                <div style={styles.actText}>{text}</div>
                <div style={styles.actTime}>{time}</div>
            </div>
        </div>
    );
}

// ── data ───────────────────────────────────────────────────────────────────
const STATS: StatCardProps[] = [
    { label: "Total Revenue", value: "₹84,290", change: "↑ 12% this month" },
    { label: "Active Users", value: "3,412", change: "↑ 5% this week" },
    { label: "Conversion Rate", value: "4.6%", change: "↑ 0.8% vs last week" },
];

const BARS: BarRowProps[] = [
    { label: "Organic", percent: 72, color: "#534AB7" },
    { label: "Direct", percent: 48, color: "#1D9E75" },
    { label: "Social", percent: 31, color: "#D85A30" },
    { label: "Email", percent: 20, color: "#BA7517" },
];

const ACTIVITY: ActivityItem[] = [
    { text: "New user signed up", time: "2 min ago", dotColor: "#1D9E75" },
    { text: "Report exported", time: "15 min ago", dotColor: "#534AB7" },
    { text: "Payment failed — retry", time: "1 hr ago", dotColor: "#D85A30" },
    { text: "Settings updated", time: "3 hr ago", dotColor: "#888" },
];

// ── main component ─────────────────────────────────────────────────────────
export default function Dashboard() {
    return (
        <main style={styles.main}>
            {/* Header — wrap with <motion.div variants={fadeUp}> */}
            <div style={styles.header}>
                <h1 style={styles.pageTitle}>Good morning, Arjun</h1>
                <p style={styles.pageSub}>Here's what's happening today</p>
            </div>

            {/* Stat cards — wrap parent with staggerChildren, each card with variants */}
            <div style={styles.statsGrid}>
                {STATS.map((s) => (
                    <StatCard key={s.label} {...s} />
                ))}
            </div>

            {/* Bottom grid */}
            <div style={styles.bottomGrid}>
                {/* Traffic card */}
                <div style={styles.card}>
                    <div style={styles.cardTitle}>Traffic by source</div>
                    {BARS.map((b) => (
                        <BarRow key={b.label} {...b} />
                    ))}
                </div>

                {/* Activity card */}
                <div style={styles.card}>
                    <div style={styles.cardTitle}>Recent activity</div>
                    {ACTIVITY.map((a) => (
                        <ActivityRow key={a.text} {...a} />
                    ))}
                </div>
            </div>
        </main>
    );
}

// ── styles ─────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
    main: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 24,
        overflowY: "auto",
        fontFamily: "'DM Sans', sans-serif",
    },
    header: {
        marginBottom: 24,
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: 500,
        color: "#111",
        margin: 0,
    },
    pageSub: {
        fontSize: 13,
        color: "#888",
        marginTop: 4,
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
        marginBottom: 24,
    },
    statCard: {
        backgroundColor: "#f8f8f7",
        borderRadius: 8,
        padding: 16,
    },
    statLabel: {
        fontSize: 12,
        color: "#888",
        marginBottom: 6,
    },
    statValue: {
        fontSize: 22,
        fontWeight: 500,
        color: "#111",
    },
    statChange: {
        fontSize: 11,
        marginTop: 4,
    },
    bottomGrid: {
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr",
        gap: 12,
    },
    card: {
        backgroundColor: "#f8f8f7",
        borderRadius: 8,
        padding: 16,
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: 500,
        color: "#111",
        marginBottom: 14,
    },
    barRow: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
    },
    barLabel: {
        fontSize: 12,
        color: "#888",
        width: 52,
    },
    barTrack: {
        flex: 1,
        height: 6,
        backgroundColor: "#e8e8e5",
        borderRadius: 99,
        overflow: "hidden",
    },
    barFill: {
        height: "100%",
        borderRadius: 99,
    },
    barNum: {
        fontSize: 12,
        color: "#888",
        width: 32,
        textAlign: "right",
    },
    activityRow: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        marginBottom: 12,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        marginTop: 4,
        flexShrink: 0,
    },
    actText: {
        fontSize: 12,
        color: "#555",
        lineHeight: 1.5,
    },
    actTime: {
        fontSize: 11,
        color: "#aaa",
        marginTop: 2,
    },
};
