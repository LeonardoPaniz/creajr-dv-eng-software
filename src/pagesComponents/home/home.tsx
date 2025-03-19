import Sidebar from "@/components/menu/sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
import { NextPage } from "next";
import "./home.css";

interface Props {}

const Home: NextPage<Props> = ({}) => {
  const data = [
    { name: "Reuniões", value: 20},
    { name: "Eventos", value: 30},
    { name: "Projetos", value: 15},
  ];

  return (
    <div className="homePage">
      <Sidebar />
      <div style={{ width: "100%" }}>
        <nav></nav>
        <main className="parent">
          <section className="header">
            <div>
              <div className="welcome">
                <p>Que bom te ver de volta👋</p>
                <h2>Leonardo Paniz Aguiar</h2>
              </div>
              <p>Ver as metas semanais {"->"}</p>
            </div>
            <div>
              <Image
                src="/homeImgs/header.svg"
                width={340}
                height={200}
                alt=""
              />
            </div>
          </section>

          <section className="goals"></section>
          <section className="nextAppointment"></section>
          <section className="yourActivity">
            <h3>Suas participações</h3>
            <div className="chartContainer">
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#0f4f8f" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
          <section className="topMembers">
            <div className="topMembersHeader">
              <h3>Classificação</h3>
              <a href="">ver todos</a>
            </div>

            <ol className="topMembersList">
              <li>
                <div className="alignInformationsLi">
                  <span className="rank">1.</span>
                  <img
                    src="/homeImgs/userProfile.webp"
                    alt="User Profile"
                    className="profilePic"
                  />
                  <div className="userInfo">
                    <h4>Leonardo Paniz Aguiar</h4>
                    <p>345 Pontos</p>
                  </div>
                </div>
                <button className="followBtn following">Seguindo</button>
              </li>

              <li>
                <div className="alignInformationsLi">
                  <span className="rank">2.</span>
                  <img
                    src="/homeImgs/userProfile.webp"
                    alt="User Profile"
                    className="profilePic"
                  />
                  <div className="userInfo">
                    <h4>Destiney Wood</h4>
                    <p>345 Pontos</p>
                  </div>
                </div>
                <button className="followBtn">Seguir</button>
              </li>

              <li>
                <div className="alignInformationsLi">
                  <span className="rank">3.</span>
                  <img
                    src="/homeImgs/userProfile.webp"
                    alt="User Profile"
                    className="profilePic"
                  />
                  <div className="userInfo">
                    <h4>Chace Rojas</h4>
                    <p>345 Pontos</p>
                  </div>
                </div>
                <button className="followBtn">Seguir</button>
              </li>
            </ol>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
