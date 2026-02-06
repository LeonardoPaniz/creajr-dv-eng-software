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
import { HandMetal } from "lucide-react";
import "./home.css";
import { useAuth } from "@/context/AuthContext";

const today = new Date();

const generateWeek = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return {
      date: date.getDate(),
    };
  });
};

const goals = [
  { name: "Reuniões", progress: 80 },
  { name: "Eventos", progress: 50 },
  { name: "Projetos", progress: 65 },
];

const appointments = [
  { day: 0, title: "Consultation", time: "8:00-9:15" },
  { day: 2, title: "Analysis", time: "11:00-12:00" },
  { day: 3, title: "Operation", time: "9:00-11:40" },
  { day: 3, title: "Rehabilitation", time: "12:00-13:30" },
  { day: 5, title: "Consultation", time: "11:00-12:15" },
];

const data = [
  { name: "Reuniões", value: 20 },
  { name: "Eventos", value: 30 },
  { name: "Projetos", value: 15 },
];

const Home: React.FC = () => {
  const { user } = useAuth();
  const week = generateWeek();

  return (
    <div className="homePage">
      <main className="parent">
        <section className="header">
          <div>
            <div className="welcome">
              <p>
                Que bom te ver de volta <HandMetal />
              </p>
              <h2>{user?.name}</h2>
            </div>
            <p>Ver as metas semanais {"->"}</p>
          </div>
          <div>
            <Image src="/homeImgs/header.svg" width={320} height={180} alt="" />
          </div>
        </section>
        <section className="nextAppointment">
          <h3>Agenda</h3>
          <div className="calendar">
            {week.map((day, index) => (
              <div key={index} className="day">
                <div className="day-header">
                  {/* <span>{day.day}</span> */}
                  <strong>{day.date.toFixed(0)}/03</strong>
                </div>
                <div className="appointments">
                  {appointments
                    .filter((appt) => appt.day === index)
                    .map((appt, i) => (
                      <div key={i} className="appointment">
                        <p className="title">{appt.title}</p>
                        <p className="time">{appt.time}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="goals">
          <div className="goalsHeader">
            <h3>Metas Semanais</h3>
            <a href="">Ver todas</a>
          </div>
          <div className="goalsContainer">
            {goals.map((goal, index) => (
              <div key={index} className="goalCard">
                <div className="circularProgress">
                  <svg>
                    <circle className="bg" cx="30" cy="30" r="26"></circle>
                    <circle
                      className="progress"
                      cx="30"
                      cy="30"
                      r="26"
                      stroke-dasharray="163.28"
                      stroke-dashoffset="40"></circle>
                  </svg>
                  <span>75%</span>
                </div>
                <div className="goalDetails">
                  <h4>{goal.name}</h4>
                  <p>Biology</p>
                  <p>Project collected in 12 August 2019 (10:45)</p>
                </div>
              </div>
              // <div key={index} className="goalItem">
              //   <div className="goalHeader">
              //     <span>{goal.name}</span>
              //     <span>{goal.progress}%</span>
              //   </div>
              //   <div className="progressBar">
              //     <div
              //       className="progressFill"
              //       style={{ width: `${goal.progress}%` }}></div>
              //   </div>
              // </div>
            ))}
          </div>
        </section>
        <section className="tasks">
          <div className="tasksHeader">
            <h3>Task</h3>
            <a href="#">See all</a>
          </div>

          <div className="taskList">
            <div className="taskItem">
              <span className="taskStatus green"></span>
              <div className="taskDetails">
                <h4>Art</h4>
                <p>Chapter 1</p>
              </div>
              <div className="taskInfo">
                <h4>Craft assignment</h4>
                <p>Illustration</p>
              </div>
              <div className="taskTime">
                <h4>12:45 PM</h4>
                <p>Friday</p>
              </div>
              <span className="taskLabel finished">Finished</span>
            </div>

            <div className="taskItem active">
              <span className="taskStatus orange"></span>
              <div className="taskDetails">
                <h4>Physics</h4>
                <p>Chapter 1</p>
              </div>
              <div className="taskInfo">
                <h4>Daily Task 2</h4>
                <p>Page 38</p>
              </div>
              <div className="taskTime">
                <h4>09:40 PM</h4>
                <p>Tuesday</p>
              </div>
              <span className="taskLabel done">Done</span>
            </div>

            <div className="taskItem">
              <span className="taskStatus yellow"></span>
              <div className="taskDetails">
                <h4>Chemistry</h4>
                <p>Chapter 1</p>
              </div>
              <div className="taskInfo">
                <h4>Daily Task 2</h4>
                <p>Page 23</p>
              </div>
              <div className="taskTime">
                <h4>08:05 PM</h4>
                <p>Friday</p>
              </div>
              <span className="taskLabel done">Done</span>
            </div>
          </div>
        </section>
      </main>
      <aside className="w-80 space-y-6">
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

            <li>
              <div className="alignInformationsLi">
                <span className="rank">4.</span>
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
            <li>
              <div className="alignInformationsLi">
                <span className="rank">5.</span>
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
      </aside>
    </div>
  );
};

export default Home;
