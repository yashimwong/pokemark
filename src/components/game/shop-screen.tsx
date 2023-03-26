import { FiArrowLeft, FiDisc, FiShoppingBag } from "react-icons/fi";

const packs = [
    { quantity: 1, price: 100, label: "Single Ball" },
    { quantity: 5, price: 450, label: "Trainer Pack" },
    { quantity: 10, price: 800, label: "Explorer Box" }
];

const ShopScreen = ({ money, pokeballs, onBuy, onLeave }: { money: number; pokeballs: number; onBuy: (quantity: number, price: number) => void; onLeave: () => void }) => (
    <section className="shop-shell">
        <header className="shop-header">
            <div><p className="eyebrow"><FiShoppingBag /> Meadow Poké Mart</p><h1>Stock up for the road.</h1><p>Every throw uses one Poké Ball—even if the Pokémon breaks free.</p></div>
            <div className="shop-wallet"><span>YOUR WALLET</span><strong>₽ {money}</strong><span>BALL CASE</span><strong><FiDisc /> {pokeballs}</strong></div>
        </header>
        <div className="shop-counter">
            {packs.map((pack) => (
                <article className="shop-item" key={pack.quantity}>
                    <div className="shop-ball"><FiDisc /></div>
                    <p>POKÉ BALL × {pack.quantity}</p>
                    <h2>{pack.label}</h2>
                    <span>Weakening a wild Pokémon raises your chance of catching it.</span>
                    <button type="button" onClick={() => onBuy(pack.quantity, pack.price)} disabled={money < pack.price}>Buy · ₽ {pack.price}</button>
                </article>
            ))}
        </div>
        <button type="button" className="shop-leave" onClick={onLeave}><FiArrowLeft /> Return to Meadow Town</button>
    </section>
);

export default ShopScreen;
