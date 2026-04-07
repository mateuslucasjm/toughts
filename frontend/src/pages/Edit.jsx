import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getToughtById, updateTought } from "../services/api";

export default function Edit() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getToughtById(id)
      .then((t) => {
        setTitle(t.title);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await updateTought(id, title);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Carregando...</p>;
  if (error) return <div className="message">{error}</div>;

  return (
    <div className="tought-form-container">
      <Link to="/dashboard">Voltar</Link>
      <h1>Editando um pensamento</h1>
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
        <input type="submit" value="Editar Pensamento" />
      </form>
    </div>
  );
}
