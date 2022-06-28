const Notice = ({ message, onClose }: { message?: string; onClose: () => void }) => {
    if (!message) return null;
    return <div className="fixed z-30 bottom-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white rounded-xl shadow-xl px-5 py-4 max-w-sm w-[calc(100%-2rem)] flex items-center gap-4"><span className="flex-1 text-sm font-medium">{message}</span><button type="button" className="text-indigo-200 font-bold" onClick={onClose}>OK</button></div>;
};

export default Notice;
