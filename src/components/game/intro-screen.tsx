import { FormEvent, useState } from "react";

const IntroScreen = ({ onStart }: { onStart: (name: string) => void }) => {
    const [name, setName] = useState("");
    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (name.trim()) onStart(name.trim());
    };

    return (
        <div className="game-panel max-w-xl mx-auto text-center py-12 px-6">
            <div className="text-6xl mb-6">⚡</div>
            <p className="text-indigo-600 font-bold tracking-[0.25em] text-xs uppercase">Welcome to</p>
            <h1 className="text-5xl sm:text-6xl font-black text-slate-900 mt-2">PokeMark</h1>
            <p className="text-slate-600 mt-6 leading-relaxed">A new adventure is waiting across the tall grass, winding paths, and friendly battles of Meadow Town.</p>
            <form onSubmit={submit} className="mt-8 flex flex-col gap-3">
                <label className="text-left font-bold text-sm text-slate-700" htmlFor="trainer-name">What is your name, Trainer?</label>
                <input id="trainer-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={12} autoFocus placeholder="Enter your name" className="rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-indigo-500" />
                <button type="submit" className="game-button mt-2" disabled={!name.trim()}>Begin adventure</button>
            </form>
        </div>
    );
};

export default IntroScreen;
