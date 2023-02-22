import UserInfoHeader from "../../components/header/UserInfoHeader";
import Todos from "../../components/todo/Todos";

function Home() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center pt-10">
      <UserInfoHeader />
      <Todos />
    </div>
  );
}

export default Home;
