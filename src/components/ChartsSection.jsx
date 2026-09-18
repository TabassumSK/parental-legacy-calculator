import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const MOTHER_COLOR = "#D97706";
const FATHER_COLOR = "#0284C7";

function shortLabel(name) {
  if (name.includes("Inheritance")) return "Genetic";
  if (name.includes("Vitality")) return "Vitality";
  if (name.includes("Mental")) return "Mental";
  if (name.includes("Intellectual")) return "Intellect";
  if (name.includes("Emotional")) return "Emotional";
  if (name.includes("Spiritual")) return "Spiritual";
  if (name.includes("Soul")) return "Soul";
  return name.length > 12 ? name.split(" ")[0] : name;
}

export default function ChartsSection({ result, overrideTab }) {
  const [activeTabState, setActiveTabState] = useState("all");
  const activeTab = overrideTab || activeTabState;
  const setActiveTab = setActiveTabState;

  const chartData = result.rows.map((r) => ({
    fullName: r.name,
    factor: shortLabel(r.name),
    Mother: Number(r.mother.toFixed(3)),
    Father: Number(r.father.toFixed(3)),
  }));

  const pieData = [
    { name: "Mother", value: Number(result.motherTotal.toFixed(3)) },
    { name: "Father", value: Number(result.fatherTotal.toFixed(3)) },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-slate-200 bg-white/95 p-3.5 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 text-xs">
          <p className="mb-2 font-heading font-bold text-slate-800 dark:text-slate-100">
            {payload[0]?.payload?.fullName || label}
          </p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
              <span className="flex items-center gap-1.5 font-medium" style={{ color: entry.color }}>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                {Number(entry.value).toFixed(3)} pts
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Section Header & Tab Controls */}
      <div className="glass-card p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Interactive Visualization Suite
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compare maternal vs paternal factor distribution with Bar & Radar charts
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800/80 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${activeTab === "all"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
          >
            All Charts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("bar")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${activeTab === "bar"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
          >
            Bar Chart
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("radar")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${activeTab === "radar"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
          >
            Radar Chart
          </button>
        </div>
      </div>

      {/* Main Bar Chart Section (Visible when tab is 'all' or 'bar') */}
      {(activeTab === "all" || activeTab === "bar") && (
        <div className="glass-card p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4 border-b border-slate-200/60 pb-3 dark:border-slate-800/80">
            <div>
              <h4 className="font-heading text-base font-bold text-slate-900 dark:text-slate-100">
                Factor Comparison Bar Chart
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Side-by-side score evaluation for each of the 7 life factors
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                <span className="h-3 w-3 rounded-sm bg-amber-500" /> Mother
              </span>
              <span className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
                <span className="h-3 w-3 rounded-sm bg-sky-500" /> Father
              </span>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 15, right: 15, left: -10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis
                  dataKey="factor"
                  tick={{ fill: "currentColor", fontSize: 11 }}
                  className="text-slate-600 dark:text-slate-400 font-medium"
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  tick={{ fill: "currentColor", fontSize: 11 }}
                  className="text-slate-600 dark:text-slate-400"
                  domain={[0, 12]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Mother" fill={MOTHER_COLOR} radius={[6, 6, 0, 0]} maxBarSize={36} />
                <Bar dataKey="Father" fill={FATHER_COLOR} radius={[6, 6, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Radar Chart & Donut Chart Grid (Visible when tab is 'all' or 'radar') */}
      {(activeTab === "all" || activeTab === "radar") && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* 7-Point Polar Radar Chart */}
          <div className="glass-card p-5 shadow-xl lg:col-span-3">
            <div className="flex items-center justify-between mb-2 border-b border-slate-200/60 pb-3 dark:border-slate-800/80">
              <div>
                <h4 className="font-heading text-base font-bold text-slate-900 dark:text-slate-100">
                  7-Factor Radar Balance Profile
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Polar visualization mapping legacy symmetry across factors
                </p>
              </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData} outerRadius="72%">
                  <PolarGrid stroke="currentColor" className="text-slate-300 dark:text-slate-700/60" />
                  <PolarAngleAxis
                    dataKey="factor"
                    tick={{ fill: "currentColor", fontSize: 11, fontWeight: 600 }}
                    className="text-slate-700 dark:text-slate-300 font-heading"
                  />
                  <PolarRadiusAxis tick={false} axisLine={false} />
                  <Radar
                    name="Mother"
                    dataKey="Mother"
                    stroke={MOTHER_COLOR}
                    fill={MOTHER_COLOR}
                    fillOpacity={0.35}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Father"
                    dataKey="Father"
                    stroke={FATHER_COLOR}
                    fill={FATHER_COLOR}
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: "12px", fontSize: "12px", fontWeight: "500" }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Overall Legacy Split Donut Chart */}
          <div className="glass-card p-5 shadow-xl lg:col-span-2">
            <div className="flex items-center justify-between mb-2 border-b border-slate-200/60 pb-3 dark:border-slate-800/80">
              <div>
                <h4 className="font-heading text-base font-bold text-slate-900 dark:text-slate-100">
                  Total Legacy Distribution
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Overall 100-point total proportional share
                </p>
              </div>
            </div>
            <div className="h-80 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="58%"
                    outerRadius="82%"
                    paddingAngle={3}
                    cornerRadius={4}
                  >
                    <Cell fill={MOTHER_COLOR} stroke="transparent" />
                    <Cell fill={FATHER_COLOR} stroke="transparent" />
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: "12px", fontSize: "12px", fontWeight: "500" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Total</span>
                <span className="font-heading text-xl font-bold text-slate-900 dark:text-slate-100">100.000</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
