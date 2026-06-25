"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TopBarMenu from "@/components/TopBarMenu";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: email,
        password: password,
      });

      if (error) {
        setLoading(false);
        setError("Email ou senha inválidos. Tente novamente.");
        return;
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
      <TopBarMenu variant="login" />

      <main className="container-principal"> 
        <div className="container-login">
          <h2><span className="destaque-chic">Bem-vindo ao WishLy!</span></h2>
          <h2>Faça seu login para começar a favoritar seus preferidos da telona!</h2>

          <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            
            {error && <p style={{ color: '#ef4444', marginBottom: '10px', fontSize: '14px' }}>{error}</p>}

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
            
            <Link href="/esqueci-senha" className="link-esqueci-senha" style={{ alignSelf: 'flex-end', marginRight: '10%' }}>
              Esqueci minha senha
            </Link>

            <Button type="submit" className="botao-login" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <hr className="linha"/>

          <p className="descricao">Ainda não tem uma conta? <Link href="/cadastro" className="link-cadastro">Cadastre-se aqui!</Link></p>
          
        </div>
      </main>
    </div>
  );
}