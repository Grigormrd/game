import { useState } from "react";
import { motion } from "framer-motion";

export default function MenuView({ setView, setPlayer }) {
  const [name, setName] = useState("");
  const [playerCreated, setPlayerCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Spieler hinzufügen
  const handleAddPlayer = async () => {
    if (!name.trim()) {
      setError("Bitte gib einen Namen ein!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Beispiel: dein Backend läuft z. B. unter http://127.0.0.1:5000
      const response = await fetch("http://127.0.0.1:5000/add_player", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.ok) {
        setPlayer(data); // speichert Spielerobjekt in App.jsx
        setPlayerCreated(true);
      } else {
        setError(data.error || "Fehler beim Erstellen des Spielers");
      }
    } catch (err) {
      setError("Server nicht erreichbar");
    } finally {
      setLoading(false);
    }
  };

  const handleStartGame = () => {
    setView("game");
  };

  return (
    <div className="flex flex-col items-center gap-6 bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-blue-200">
      <motion.h1
        className="text-4xl font-extrabold text-blue-700 mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ☃️ Melting Snowman
      </motion.h1>

      <div className="flex flex-col items-center gap-3 w-72">
        <input
          type="text"
          placeholder="Dein Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        />

        <button
          onClick={handleAddPlayer}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold transition
            ${loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"}
          `}
        >
          {loading ? "Wird hinzugefügt..." : "Spieler hinzufügen"}
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {playerCreated && (
          <motion.button
            onClick={handleStartGame}
            className="w-full py-2 mt-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            🎮 Spiel starten
          </motion.button>
        )}
      </div>
    </div>
  );
}