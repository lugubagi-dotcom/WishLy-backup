"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import TopBarMenu from "@/components/TopBarMenu";

const API_URL = "http://localhost:3001";

export default function Filmes() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Proteção de rota
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Estado da lista de filmes
  const [filmes, setFilmes] = useState([]);

  // Estado do formulário
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");

  // Estado de controle
  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // READ
  useEffect(() => {
    if (session) {
      buscarFilmes();
    }
  }, [session]);

  async function buscarFilmes() {
    const res = await fetch(`${API_URL}/api/movies`);
    const data = await res.json();
    setFilmes(data);
  }

  // CREATE e UPDATE — mesmo formulário
  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const body = {
      title,
      description,
      year: year ? Number(year) : null,
      poster,
    };

    if (editandoId) {
      // UPDATE
      const res = await fetch(`${API_URL}/api/movies/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        setErro("Erro ao atualizar o filme.");
        setLoading(false);
        return;
      }

      setEditandoId(null);
    } else {
      // CREATE
      const res = await fetch(`${API_URL}/api/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        setErro("Erro ao adicionar o filme.");
        setLoading(false);
        return;
      }
    }

    // Limpa o formulário
    setTitle("");
    setDescription("");
    setYear("");
    setPoster("");
    setLoading(false);

    // Atualiza a lista
    buscarFilmes();
  }

  // Preenche o formulário com os dados do filme para editar
  function handleEditar(filme) {
    setEditandoId(filme.id);
    setTitle(filme.title);
    setDescription(filme.description || "");
    setYear(filme.year || "");
    setPoster(filme.poster || "");
    setErro("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // DELETE
  async function handleDeletar(id) {
    const confirmado = confirm("Tem certeza que deseja remover este filme?");
    if (!confirmado) return;

    await fetch(`${API_URL}/api/movies/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    buscarFilmes();
  }

  // Cancela a edição
  function handleCancelar() {
    setEditandoId(null);
    setTitle("");
    setDescription("");
    setYear("");
    setPoster("");
    setErro("");
  }

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  if (isPending || !session) return null;

  return (
    <div className="principal">
      <TopBarMenu variant="dashboard" onLogout={handleLogout} />

      <main style={{ padding: "40px 5%", flex: 1 }}>

        <h2 style={{ fontSize: "2rem", marginBottom: "8px" }}>
          <span className="destaque-chic" style={{ fontSize: "2rem" }}>
            {editandoId ? "Editar Obra" : "Catalogar Obra"}
          </span>
        </h2>

        {/* FORMULÁRIO*/}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "500px",
            margin: "20px auto 50px",
          }}
        >
          {erro && (
            <p style={{ color: "#ef4444", fontSize: "14px" }}>{erro}</p>
          )}

          <input
            type="text"
            placeholder="Título *"
            className="input-login"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Descrição"
            className="input-login"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="Ano (ex: 2024)"
            className="input-login"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <input
            type="text"
            placeholder="URL do Poster"
            className="input-login"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />

          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              type="submit"
              className="botao-login"
              disabled={loading}
              style={{ width: "auto", padding: "0rem 2rem", margin: "2rem" }}
            >
              {loading
                ? "Salvando..."
                : editandoId
                ? "Salvar Alterações"
                : "Adicionar Obra"}
            </button>

            {editandoId && (
              <button
                type="button"
                onClick={handleCancelar}
                style={{
                  padding: "0.8rem 2rem",
                  background: "transparent",
                  border: "1px solid rgba(244,241,234,0.3)",
                  color: "var(--text-main)",
                  borderRadius: "2px",
                  cursor: "pointer",
                  fontSize: "large",
                  letterSpacing: "1.5px",
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* LISTA*/}
        <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>
          <span className="destaque-chic" style={{ fontSize: "2rem" }}>
            Lista de Filmes Disponiveis
          </span>
        </h2>

        {filmes.length === 0 ? (
          <p style={{ color: "rgba(244,241,234,0.5)", fontSize: "1rem" }}>
            Nenhuma obra adicionada ainda.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "20px",
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            {filmes.map((filme) => (
              <div
                key={filme.id}
                style={{
                  background: "rgba(244,241,234,0.05)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Poster */}
                {filme.poster ? (
                  <img
                    src={filme.poster}
                    alt={filme.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      background: "rgba(212,175,55,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(212,175,55,0.4)",
                      fontSize: "3rem",
                    }}
                  >
                    
                  </div>
                )}

                {/* Informações */}
                <div style={{ padding: "16px", flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "var(--gold-accent)",
                      fontSize: "1.1rem",
                      marginBottom: "6px",
                      textAlign: "left",
                    }}
                  >
                    {filme.title}
                  </h3>

                  {filme.year && (
                    <p
                      style={{
                        color: "rgba(244,241,234,0.5)",
                        fontSize: "0.85rem",
                        textAlign: "left",
                        marginBottom: "6px",
                      }}
                    >
                      {filme.year}
                    </p>
                  )}

                  {filme.description && (
                    <p
                      style={{
                        color: "rgba(244,241,234,0.7)",
                        fontSize: "0.85rem",
                        textAlign: "left",
                        lineHeight: "1.4",
                      }}
                    >
                      {filme.description.length > 100
                        ? filme.description.slice(0, 97) + "..."
                        : filme.description}
                    </p>
                  )}
                </div>

                {/* Botões UPDATE e DELETE */}
                <div
                  style={{
                    display: "flex",
                    borderTop: "1px solid rgba(212,175,55,0.15)",
                  }}
                >
                  <button
                    onClick={() => handleEditar(filme)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "transparent",
                      border: "none",
                      borderRight: "1px solid rgba(212,175,55,0.15)",
                      color: "var(--gold-accent)",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      letterSpacing: "1px",
                    }}
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDeletar(filme.id)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "transparent",
                      border: "none",
                      color: "#ef4444",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      letterSpacing: "1px",
                    }}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer
        className="footer"
        style={{
          textAlign: "center",
          padding: "40px 20px 20px",
          color: "rgba(212, 175, 55, 0.6)",
          fontSize: "0.9rem",
        }}
      >
        <p>© 2026 WishLy Filmes. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}