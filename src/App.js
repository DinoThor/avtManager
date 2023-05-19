import 'rsuite/dist/rsuite.min.css';

import NavBar from './components/navbar/Navbar';
import UserPicker from './components/userPicker/UserPicker';
import { useEffect, useState } from 'react';
import ScatterChart from './components/scatter/ScatterChart';

function App() {
  const [users, setusers] = useState([]);
  const [picked, setpicked] = useState(null);
  const [data, setdata] = useState(null);

  useEffect(() => {
    window.dataAPI.getUsers().then((users) => setusers(users));
    window.dataAPI.getData((event, values) => setdata(values));
  }, [])

  useEffect(() => {
    window.dataAPI.sendUserName(picked);
  }, [picked])

  return (
    <div>
      <NavBar />
      <UserPicker users={users} selected={setpicked} />
      <div style={{ margin: 30 }}>
        {data != null ? <ScatterChart rawData={data} /> : null}
      </div>
    </div>
  );
}

export default App;
