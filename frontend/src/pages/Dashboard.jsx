import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dashboard, removeTought } from "../services/api";

export default function Dashboard() {
  const [toughts, setToughts] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
    dashboard()
      .then((data) => {
        setToughts(data.toughts || []);
        setEmpty(data.empty);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  async function handleRemove(id) {
    if (!confirm("Tem certeza?")) return;
    try {
      await removeTought(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="dashboard">
      <div className="title-container">
        <h2>Dashboard</h2>
        <Link to="/add" className="btn">Criar Pensamento</Link>
      </div>
      <h3>Seus pensamentos</h3>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <ul>
            {toughts.map((t) => (
              <li key={t.id}>
                <span className="label">{t.title}</span>
                <span className="actions">
                  <Link to={`/edit/${t.id}`} className="btn">Editar</Link>
                  <button className="btn" onClick={() => handleRemove(t.id)}>Excluir</button>
                </span>
              </li>
            ))}
          </ul>
          {empty && (
            <p>
              Ainda nao ha nenhum pensamento seu, comece a criar{" "}
              <Link to="/add">por aqui</Link>
            </p>
          )}
        </>
      )}
    </div>
  );
}
