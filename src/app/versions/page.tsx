import React from 'react';

const versions = [
    { id: 1, version: 'v1.0.0', tag: 'Stable', status: 'Running', releaseDate: '2023-10-01', description: 'Initial stable release with core features.' },
    { id: 2, version: 'v1.1.0-beta', tag: 'Beta', status: 'Stopped', releaseDate: '2023-10-15', description: 'Added AI personality modules and bug fixes.' },
    { id: 3, version: 'v2.0.0-alpha', tag: 'Alpha', status: 'Available', releaseDate: '2023-11-01', description: 'Complete rewrite with new engine.' },
];

export default function VersionsPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Bot Versions</h1>
                    <p className="text-[var(--text-muted)]">Manage and deploy different versions of Shadow AI.</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <span>+</span> Upload New Version
                </button>
            </div>

            <div className="grid gap-6">
                {versions.map((ver) => (
                    <div key={ver.id} className="glass-panel p-6 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-[var(--primary)] transition-all">
                        <div className="flex items-start gap-4 flex-1">
                            <div className="p-4 rounded-lg bg-[var(--background)] border border-[var(--border)] text-2xl group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                                📦
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-xl font-bold">{ver.version}</h3>
                                    <span className={`px-2 py-0.5 rounded textxs font-medium border ${ver.tag === 'Stable' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                            ver.tag === 'Beta' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                'bg-purple-500/10 text-purple-500 border-purple-500/20'
                                        }`}>
                                        {ver.tag}
                                    </span>
                                </div>
                                <p className="text-sm text-[var(--text-muted)] mb-2">{ver.description}</p>
                                <div className="text-xs text-[var(--text-muted)]/60">Released: {ver.releaseDate}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-[var(--border)]">
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">Status</span>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${ver.status === 'Running' ? 'bg-green-500 animate-pulse' :
                                            ver.status === 'Stopped' ? 'bg-red-500' :
                                                'bg-gray-500'
                                        }`}></div>
                                    <span className={
                                        ver.status === 'Running' ? 'text-green-500 font-medium' :
                                            ver.status === 'Stopped' ? 'text-red-500' :
                                                'text-[var(--text-muted)]'
                                    }>{ver.status}</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {ver.status === 'Running' ? (
                                    <button className="px-4 py-2 rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors text-sm font-medium">
                                        Stop
                                    </button>
                                ) : (
                                    <button className="px-4 py-2 rounded-lg border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors text-sm font-medium">
                                        Deploy
                                    </button>
                                )}
                                <button className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:bg-[var(--secondary)] transition-colors">
                                    ⚙️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
