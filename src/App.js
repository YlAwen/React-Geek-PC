import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { hasToken } from "utils/storage";
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
          <Route
            path="/home/*"
            element={hasToken() ? <Layout></Layout> : <Navigate to="/login" />}
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/*" element={<Navigate to="/login" />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
