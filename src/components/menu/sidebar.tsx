import { useState } from "react";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import "./sidebar.css"; // Importa o CSS normal

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <div className={`app-container ${isOpen ? "sidebar-open" : ""}`}>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav>
          <ul>
            <li onClick={() => handleNavigation("/home")}>🏠 Home</li>
            <li onClick={() => handleNavigation("/dashboard")}>📊 Dashboard</li>
            <li onClick={() => handleNavigation("/settings")}>
              ⚙ Configurações
            </li>
            <li onClick={() => handleNavigation("/logout")}>🚪 Sair</li>
          </ul>
        </nav>
      </div>

      {/* Conteúdo principal */}
      <div className="main-content">
        {/* Botão de abrir/fechar */}
        <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Renderiza o conteúdo da página */}
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
