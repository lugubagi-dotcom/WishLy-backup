import Link from "next/link";

export default function TopBarMenu({ variant, onLogout }) {
  return (
    <header className="header">
      <div className="logo-container">
        <Link href="/">
          <img src="/logo3.0.png" alt="Logo WishLy Filmes" className="logo" />
        </Link>
      </div>

      <div className="buttons-container">
        {/* Mostra na Home */}
        {variant === "home" && (
          <>
            <Link href="/login" className="login">ENTRAR</Link>
            <Link href="/cadastro" className="cadastro">PEGAR INGRESSO</Link>
          </>
        )}

        {/* Mostra na página de Login */}
        {variant === "login" && (
          <Link href="/cadastro" className="cadastro">PEGAR INGRESSO</Link>
        )}

        {/* Mostra na página de Cadastro */}
        {variant === "cadastro" && (
          <Link href="/login" className="login">ENTRAR</Link>
        )}

        {/* Mostra na Dashboard */}
        {variant === "dashboard" && (
          <>
            
          </>
        )}
      </div>
    </header>
  );
}