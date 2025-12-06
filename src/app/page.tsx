import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Bots" value="1/5" icon="🤖" trend="+1" trendUp={true} />
        <StatCard title="Total Instances" value="3" icon="📦" trend="+2" trendUp={true} />
        <StatCard title="CPU Usage" value="12%" icon="⚡" trend="-5%" trendUp={true} />
        <StatCard title="Memory Usage" value="1.2 GB" icon="🧠" trend="+100MB" trendUp={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-[var(--primary)]">📊</span> Server Analytics
          </h3>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {/* Mock Chart */}
            {[40, 60, 45, 70, 50, 80, 65, 85, 90, 75, 60, 95].map((h, i) => (
              <div key={i} className="w-full bg-[var(--primary)]/20 rounded-t-sm hover:bg-[var(--primary)]/50 transition-colors relative group" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--card-bg)] px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity border border-[var(--border)]">{h}%</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-[var(--text-muted)]">
            <span>00:00</span>
            <span>04:00</span>
            <span>08:00</span>
            <span>12:00</span>
            <span>16:00</span>
            <span>20:00</span>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <div className="flex flex-col gap-4">
            <ActivityItem title="Bot Started" desc="Shadow v1.1.0" time="2 mins ago" status="success" />
            <ActivityItem title="Deploy Failed" desc="Shadow v1.2.0-beta" time="15 mins ago" status="error" />
            <ActivityItem title="Config Updated" desc="Updated environment variables" time="1 hour ago" status="info" />
            <ActivityItem title="System Maintenance" desc="Scheduled downtime complete" time="5 hours ago" status="info" />
          </div>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon, trend, trendUp }: any) => (
  <div className="glass-panel p-6 hover:border-[var(--primary)] transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-lg bg-[var(--background)] text-2xl border border-[var(--border)]">{icon}</div>
      <span className={`text-xs px-2 py-1 rounded-full border ${trendUp ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
        {trend}
      </span>
    </div>
    <h3 className="text-[var(--text-muted)] text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ActivityItem = ({ title, desc, time, status }: any) => (
  <div className="flex gap-4 items-start pb-4 border-b border-[var(--border)] last:border-0 last:pb-0">
    <div className={`mt-1 w-2 h-2 rounded-full ${status === 'success' ? 'bg-green-500' : status === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
    <div>
      <h4 className="font-semibold text-sm">{title}</h4>
      <p className="text-xs text-[var(--text-muted)] mt-0.5">{desc}</p>
      <span className="text-[10px] text-[var(--text-muted)]/60 mt-1 block">{time}</span>
    </div>
  </div>
);
