import { useState } from "react";
import { useRouter } from "next/router";
import { Menu, X, Home, BarChart, Settings, LogOut } from "lucide-react";
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

      {/* Conteúdo principal */}
      <div className="main-content">
        {/* Botão de abrir/fechar */}
        <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <div className="userRow">
            <img
              src="/homeImgs/userProfile.webp"
              className="profilePic"
              alt=""
            />
            <div>
              <h3>Leonardo Paniz Aguiar</h3>
              <p>Membro</p>
            </div>
          </div>
          <nav>
            <ul className={`menu-list ${isOpen ? "expanded" : "collapsed"}`}>
              <li onClick={() => handleNavigation("/home")} title="Home">
                <Home size={24} /> {isOpen && "Home"}
              </li>
              <li
                onClick={() => handleNavigation("/dashboard")}
                title="Dashboard">
                <BarChart size={24} /> {isOpen && "Dashboard"}
              </li>
              <li
                onClick={() => handleNavigation("/settings")}
                title="Configurações">
                <Settings size={24} /> {isOpen && "Configurações"}
              </li>
              <li onClick={() => handleNavigation("/logout")} title="Sair">
                <LogOut size={24} /> {isOpen && "Sair"}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
