const HealthBar = ({ current, max, compact }: { current: number; max: number; compact?: boolean }) => {
    const percent = Math.max(0, Math.round(current / max * 100));
    const condition = percent > 50 ? "stable" : percent > 20 ? "strained" : "critical";
    return (
        <div className={`health-meter ${compact ? "health-meter-compact" : ""}`}>
            <div className="health-meter-label"><span>Vitality</span><span>{current} / {max}</span></div>
            <div className="health-meter-track"><div className={`health-meter-fill health-${condition}`} style={{ width: `${percent}%` }} /></div>
        </div>
    );
};

export default HealthBar;
