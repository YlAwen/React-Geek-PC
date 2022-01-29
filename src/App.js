import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Navigate,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <NavLink to="/login">登录</NavLink>
        <NavLink to="/home">首页</NavLink> */}

        {/* 配置路由规则 */}
        <Routes>
          <Route path="/home" element={<Layout></Layout>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          {/* <Route path="/*" element={<Navigate to="/home" />}></Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
