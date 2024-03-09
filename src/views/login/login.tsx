import { useState } from "react";
import { useNavigate } from "react-router-dom";

function login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate  = useNavigate();

  function handleLogin() {

  }

  return (
    <div className="login-container">
      <form>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디 입력"
            />
            </div>
            <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
            />
          </div>
          <div>
            <button type="button" onClick={handleLogin}>로그인</button>
            <button type="button" onClick={() => navigate('/join')}>회원가입</button>
          </div>   
      </form>
    </div>
  );
}

export default login;