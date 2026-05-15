import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
    IconSparkles,
    IconStack2,
    IconHandClick,
    IconSettings2,
} from "@tabler/icons-react";

const ITEMS = [
    {
        id: 1,
        icon: <IconSparkles size={18} stroke={1.5} />,
        question: "What is Engaging Design?",
        answer:
            "Engaging design captures attention and creates meaningful experiences. It blends aesthetics with functionality to keep users interested and coming back.",
    },
    {
        id: 2,
        icon: <IconStack2 size={18} stroke={1.5} />,
        question: "Principles and Patterns",
        answer:
            "Establishing consistent visual hierarchies and predictable interactions across your interface.",
    },
    {
        id: 3,
        icon: <IconHandClick size={18} stroke={1.5} />,
        question: "Usability & Accessibility",
        answer:
            "Great products work for everyone. Usability ensures interfaces are intuitive, while accessibility ensures they are inclusive for users of all abilities.",
    },
    {
        id: 4,
        icon: <IconSettings2 size={18} stroke={1.5} />,
        question: "UX Optimization",
        answer:
            "UX optimization is the process of improving how users interact with your product — reducing friction, increasing clarity, and boosting satisfaction over time.",
    },
];


export default function Accordion() {
    const [openId, setOpenId] = useState<number | null>(2);

    return (
        <div style={s.page}>
            <div style={s.list}>
                {ITEMS.map((item) => {
                    const isOpen = openId === item.id;

                    return (
                        // 👇 animate this div's background/shadow on open
                        <motion.div
                            initial={{
                                opacity:0
                            }}
                            animate={{
                                opacity: 1,
                                animationDelay: 1,
                            }}
                            key={item.id} style={{ ...s.item, ...(isOpen ? s.itemOpen : {}) }}>

                            {/* Trigger row */}
                            <button style={s.trigger} onClick={() => setOpenId(isOpen ? null : item.id)}>

                                {/* Icon bubble */}
                                <motion.div
                                initial={{
                                    opacity:isOpen ? 1:0,

                                }}
                                animate={{
                                    opacity:1,
                                    transition:{
                                        duration:1
                                    }
                                }}
                                
                                style={{ ...s.iconWrap, ...(isOpen ? s.iconWrapOpen : {}) }}>
                                    {item.icon}
                                </motion.div>

                                <motion.span style={{ ...s.question, ...(isOpen ? s.questionOpen : {}) }}>
                                    {item.question}
                                </motion.span>

                                {/* Chevron — 👇 rotate this with variants when open */}
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#94a3b8"
                                    strokeWidth="2"
                                    style={{
                                        flexShrink: 0,
                                        marginLeft: "auto",
                                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                    }}
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>

                            </button>

                            {/* Answer panel — 👇 animate height + opacity with AnimatePresence */}
                            <AnimatePresence>

                                {isOpen && (
                                    <motion.div
                                    initial={{height:0,opacity:0}}
                                    animate={{height:"auto",opacity:1}}
                                    exit={{height:0,opacity:0}}
                                    transition={{type:"spring",stiffness:300,damping:25,mass:2}}
                                    style={{overflow:"hidden"}}>
                                        <p style={s.answerText}>{item.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

const s: Record<string, React.CSSProperties> = {
    page: {
        minHeight: "100vh",
        backgroundColor: "#f1f3f7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "'DM Sans', sans-serif",
    },
    list: {
        width: "100%",
        maxWidth: 480,
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    item: {
        backgroundColor: "#fff",
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid #e8eaf0",
    },
    itemOpen: {
        boxShadow: "0 4px 20px rgba(99,102,241,0.08)",
        border: "1px solid #e0e3f0",
    },
    trigger: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "16px 20px",
        background: "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left" as const,
    },
    iconWrap: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: "#f1f3f7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#64748b",
        flexShrink: 0,
    },
    iconWrapOpen: {
        backgroundColor: "#eef0fb",
        color: "#4f46e5",
    },
    question: {
        fontSize: 15,
        fontWeight: 500,
        color: "#334155",
        flex: 1,
    },
    questionOpen: {
        color: "#1e1b4b",
        fontWeight: 600,
    },
    answer: {
        borderTop: "1px solid #f1f3f7",
    },
    answerText: {
        margin: 0,
        padding: "4px 20px 18px 68px",
        fontSize: 14,
        color: "#64748b",
        lineHeight: 1.7,
    },
};
