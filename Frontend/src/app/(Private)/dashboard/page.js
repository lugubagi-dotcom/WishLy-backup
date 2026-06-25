"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import TopBarMenu from "@/components/TopBarMenu";
import { useEffect } from "react";


export default function Dashboard() {
  const router = useRouter();
  const {data: session, isPending } = authClient.useSession();

   useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  if (isPending || !session) return null;

  return (
    <div className="principal">
      <TopBarMenu variant="dashboard" onLogout={handleLogout} />
      
      <main className="main-content">
        <div className="home-intro" style={{ textAlign: 'center', padding: '0 20px' }}>
          <h2 style={{ fontSize: '3.5rem', lineHeight: '1.2', marginBottom: '15px' }}>
            Sua lista de desejos, <br/>
            <span className="destaque-chic">Simplificada.</span>
          </h2>
        </div>

        <div className="descricao">
          <p style={{ padding: "0 8px" }}>
            O espetáculo vai começar. Busque seus clássicos favoritos ou sorteie a estrela da noite. O <span className="destaque-chic">WishLy</span> trará recomendações personalizadas direto para a sua tela.
          </p>
        </div>

        <div className="interativo">
          <input type="text" placeholder="Qual obra você procura?" className="search-bar"/>
          <button className="pesquisar-botao">Pesquisar</button>
          <button className="random-botao">Sortear Filme!</button>
        </div>
      </main>
      
      {/* filmes recomendados, vou implementar quando souber como fazer */}
      
      <footer className="footer" style={{ textAlign: 'center', padding: '60px 20px 20px', color: 'rgba(212, 175, 55, 0.6)', fontSize: '0.9rem' }}>
        <p>© 2026 WishLy Filmes. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}