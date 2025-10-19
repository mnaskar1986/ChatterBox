import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChannelPage from "./pages/ChannelPage";
import SignupPage from "./pages/SignupPage";
import UserProfilePage from "./pages/UserProfilePage";
import UsersListPage from "./pages/UsersListPage";
import AddUserPage from "./pages/AddUserPage";
import CreateChannelPage from "./pages/CreateChannelPage";
import ChannelListPage from "./pages/ChannelListPage";
import ChannelDetailsPage from "./pages/ChannelDetailsPage";
import SendMessagePage from "./pages/SendMessagePage";
import MessageListPage from "./pages/MessageListPage";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<LoginPage />} exact />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/channel/:id" element={<ChannelPage />}></Route>
            <Route path="/register" element={<SignupPage />}></Route>
            <Route path="/admin/user/new" element={<AddUserPage />}></Route>
            <Route path="/channels" element={<CreateChannelPage />}></Route>
            <Route path="/channels/:id" element={<ChannelDetailsPage />}></Route>
            <Route path="/profile" element={<UserProfilePage />}></Route>
            <Route path="/admin/users" element={<UsersListPage />}></Route>
            <Route path="/channels/public" element={<ChannelListPage />}></Route>
            <Route path="/channels/:id/message" element={<SendMessagePage />}></Route>
            <Route path="/messages/:id" element={ <MessageListPage /> }></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
