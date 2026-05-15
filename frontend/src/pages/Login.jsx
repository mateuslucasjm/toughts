import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-container">
      <h2>Entrar</h2>
      <p className="auth-subtitle">Bem-vindo de volta. Acesse sua conta.</p>
      {error && <div className="message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o seu e-mail"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite a sua senha"
            required
          />
        </div>
        <input type="submit" value="Entrar" className="auth-submit" />
        <p className="auth-footer">
          Nao tem uma conta? <Link to="/register">Criar conta</Link>
        </p>
      </form>
    </div>
  );
}
