"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import TopBarMenu from "@/components/TopBarMenu";

export default function Home() {
  const [full_name, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email: email,
        password: password,
        name: full_name,
      });

      if (authError) {
        setLoading(false);
        setError("Erro ao cadastrar: " + authError.message);
        return;
      }

      if (username && data?.user?.id) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/user/username`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ userId: data.user.id, username }),
        });
      }

      router.push("/dashboard");

    } catch (err) {
      setLoading(false);
      console.error("Erro inesperado:", err);
      setError("O servidor não respondeu. Veja o console.");
    }
  };

  return (
    <div className="principal-login">
      <TopBarMenu variant="cadastro" />

      <main className="container-principal"> 
        <div className="container-login">
          <h2><span className="destaque-chic">Bem-vindo ao WishLy!</span></h2>
          <h3>Faça seu cadastro para começar a favoritar seus filmes preferidos!</h3>

          <form onSubmit={handleRegister} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            
            {error && <p style={{ color: '#ef4444', marginBottom: '10px', fontSize: '14px' }}>{error}</p>}

            <Input
              type="text"
              placeholder="Nome Completo"
              className="input-login"
              required
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
            />

            <Input
              type="text"
              placeholder="Username"
              className="input-login"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              type="email"
              placeholder="Email"
              className="input-login"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Senha"
              className="input-login"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" className="botao-login" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>

          <hr className="linha"/>

          <p className="descricao">Já tem uma conta? <Link href="/login" className="link-cadastro">Faça o Login aqui!</Link></p>
          
        </div>
      </main>
    </div>
  );
}