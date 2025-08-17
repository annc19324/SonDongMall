// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DangNhap from './components/DangNhap';
import DangKy from './components/DangKy';
import TrangChuPage from './pages/TrangChuPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dang-nhap" element={<DangNhap />} />
          <Route path="/dang-ky" element={<DangKy />} />
          <Route path="/trang-chu" element={<TrangChuPage />} />
          <Route path="/" element={<DangNhap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;