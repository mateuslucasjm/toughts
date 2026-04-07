import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTought } from "../services/api";

export default function Create() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await createTought(title);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="tought-form-container">
      <Link to="/dashboard">Voltar</Link>
      <h1>Criando um pensamento</h1>
      {error && <div className="message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Pensamento:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o seu pensamento..."
            required
          />
        </div>
        <input type="submit" value="Criar Pensamento" />
      </form>
    </div>
  );
}
