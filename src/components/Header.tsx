import React from 'react';

const Header = () => {
    return (
        <header className="h-16 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <span>Shadow Panel</span>
                <span>/</span>
                <span className="text-white">Dashboard</span>
            </div>

            <div className="flex items-center gap-4">
                <button className="px-4 py-2 text-xs font-semibold rounded-full bg-[var(--card-bg)] border border-[var(--border)] text-white hover:border-[var(--primary)] transition-colors">
                    Status: <span className="text-[var(--success)]">Operational</span>
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-[var(--border)]"></div>
            </div>
        </header>
    );
};

export default Header;
