import Link from "next/link";
import TopBarMenu from "@/components/TopBarMenu";

export default function Home() {
  return (
    <div className="principal">
      <TopBarMenu variant="home" />
      
      <main className="main-content">
        <div className="home-intro" style={{ textAlign: 'center', padding: '0 20px' }}>
          <h2 style={{ fontSize: '3.5rem', lineHeight: '1.2', marginBottom: '15px' }}>
            Sua lista de desejos, <br/>
            <span className="destaque-chic">Simplificada.</span>
          </h2>
          <h3 style={{ fontSize: '1.1rem', color: '#C2BFB8', fontWeight: '300' }}>
            Salve os melhores filmes para assistir. Está em dúvida? Deixe a escolha com o projetor!
          </h3>
        </div>

        <div className="descricao">
          <p style={{ padding: "0 8px" }}>
            O <span className="destaque-chic">WishLy Filmes</span> é o seu catálogo pessoal da sétima arte. Uma plataforma elegante para os verdadeiros amantes do cinema organizarem suas listas, seja para assistir a um clássico mais tarde, recomendar a amigos ou manter o registro daquelas sessões inesquecíveis.
          </p>
        </div>

      </main>
      
      <footer className="footer" style={{ textAlign: 'center', padding: '60px 20px 20px', color: 'rgba(212, 175, 55, 0.6)', fontSize: '0.9rem' }}>
        <p>© 2026 WishLy Filmes. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}