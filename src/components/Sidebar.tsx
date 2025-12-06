import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-[var(--sidebar-bg)] border-r border-[var(--border)] p-6 z-50">
            <div className="mb-10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--accent)] animate-pulse"></div>
                <h1 className="text-xl font-bold tracking-tight text-white">ShadowPanel</h1>
            </div>

            <nav className="flex flex-col gap-2">
                <NavLink href="/" label="Dashboard" icon="⚡" />
                <NavLink href="/versions" label="Bot Versions" icon="🤖" />
                <NavLink href="/terminal" label="Web Terminal" icon="💻" />
                <NavLink href="/settings" label="Settings" icon="⚙️" />
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
                <div className="p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] text-sm">
                    <p className="text-[var(--text-muted)] mb-1">Coins Balance</p>
                    <p className="text-xl font-bold text-[var(--success)]">1,500 <span className="text-xs">🪙</span></p>
                </div>
            </div>
        </aside>
    );
};

const NavLink = ({ href, label, icon }: { href: string; label: string; icon: string }) => (
    <Link
        href={href}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-muted)] hover:bg-[var(--secondary)] hover:text-white transition-all duration-200"
    >
        <span className="text-xl">{icon}</span>
        <span className="font-medium">{label}</span>
    </Link>
);

export default Sidebar;
