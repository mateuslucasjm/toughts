import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getToughts } from "../services/api";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [toughts, setToughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localSearch, setLocalSearch] = useState(searchParams.get("search") || "");

  const search = searchParams.get("search") || "";

  useEffect(() => {
    setLoading(true);
    getToughts({ search, order: "new" })
      .then((data) => setToughts(data.toughts || []))
      .catch(() => setToughts([]))
      .finally(() => setLoading(false));
  }, [search]);

  function handleSearch(e) {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchParams({ search: localSearch.trim() });
    } else {
      setSearchParams({});
    }
  }

  function handleOrder(order) {
    const params = {};
    if (search) params.search = search;
    if (order === "old") params.order = "old";
    setLoading(true);
    getToughts(params)
      .then((data) => setToughts(data.toughts || []))
      .catch(() => setToughts([]))
      .finally(() => setLoading(false));
  }

  function clearSearch() {
    setLocalSearch("");
    setSearchParams({});
  }

  return (
    <>
      <div className="home-header">
        {search ? (
          <>
            <h1>Voce esta buscando por: <span>{search}</span></h1>
            {toughts.length > 0 ? (
              <p>Foram encontrados <span>{toughts.length}</span> pensamentos</p>
            ) : (
              <p>Nenhum pensamento foi encontrado para o termo <span>{search}</span></p>
            )}
          </>
        ) : (
          <h1>Conheca alguns dos nossos <span>Pensamentos</span>:</h1>
        )}
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Esta buscando por algo?"
          />
          <input type="submit" className="btn" value="Buscar" />
        </form>
        <div className="order-container">
          <span>Ordernar por:</span>
          <button type="button" onClick={() => handleOrder("new")}>
            <i className="bi bi-arrow-up"></i>
          </button>
          <button type="button" onClick={() => handleOrder("old")}>
            <i className="bi bi-arrow-down"></i>
          </button>
          <button type="button" className="btn-clear" onClick={clearSearch}>
            Limpar
          </button>
        </div>
      </div>
      <div className="toughts-container">
        {loading ? (
          <p>Carregando...</p>
        ) : toughts.length === 0 ? (
          <p>Nenhum pensamento encontrado.</p>
        ) : (
          toughts.map((t) => (
            <figure key={t.id}>
              <blockquote>"{t.title}"</blockquote>
              <figcaption>
                por <span>{t.userName || t.User?.name || "Anônimo"}</span>
              </figcaption>
            </figure>
          ))
        )}
      </div>
    </>
  );
}
