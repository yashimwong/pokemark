import classNames from "classnames";

const HealthBar = ({ current, max, compact }: { current: number; max: number; compact?: boolean }) => {
    const percent = Math.max(0, Math.round(current / max * 100));
    const color = percent > 50 ? "bg-green-500" : percent > 20 ? "bg-yellow-400" : "bg-red-500";
    return (
        <div className={classNames("w-full", compact ? "text-[10px]" : "text-xs")}>
            <div className="flex justify-between font-bold mb-1"><span>HP</span><span>{current}/{max}</span></div>
            <div className="h-2 rounded-full bg-slate-200 overflow-hidden"><div className={classNames("h-full rounded-full transition-all", color)} style={{ width: `${percent}%` }} /></div>
        </div>
    );
};

export default HealthBar;
