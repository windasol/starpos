import { useState } from "react";
import { Users, joinUser } from "../../common/rest/userRest";

function Join() {
  const [userInfo, setUserInfo] = useState<Partial<Users>>({
    isLogin: false,
  });

  async function handleSubmit() {
    await joinUser(userInfo);
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>id:</label>
          <input
            type="text"
            value={userInfo.userId}
            onChange={(e) => setUserInfo({...userInfo, userId: e.target.value})}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            // value={userInfo.userPw}
            onChange={(e) => setUserInfo({...userInfo, userPw: e.target.value})}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            // value={userInfo.email}
            onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="number"
            // value={userInfo.phone}
            onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
          />
        </div>
        <div>
          <label>name:</label>
          <input
            type="text"
            // value={userInfo.name}
            onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Join;