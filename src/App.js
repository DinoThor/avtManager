import 'rsuite/dist/rsuite.min.css';
import './App.css'

import { Nav } from 'rsuite';
import { useEffect, useState } from 'react';
import TrashIcon from '@rsuite/icons/Trash';

import ScatterChart from './components/scatter/ScatterChart';
import StackChart from './components/stack/StackChart';
import NavBar from './components/navbar/Navbar';
import UserPicker from './components/userPicker/UserPicker';
import LineChart from './components/lineChart/LineChart';


function App() {
  const [users, setusers] = useState([]);
  const [picked, setpicked] = useState(null);
  const [data, setdata] = useState(null);
  const [chronData, setchronData] = useState(null);
  const [tab, settab] = useState('av');

  useEffect(() => {
    window.dataAPI.getUsers((event, values) => setusers(values));
    window.dataAPI.getData((event, values) => setdata(values));
    window.dataAPI.getChron((event, values) => setchronData(values));
    window.dataAPI.askUsers();
  }, [])

  useEffect(() => {
    window.dataAPI.sendUserName(picked);
    window.dataAPI.askChron(picked);
    console.log(chronData);
  }, [picked])

  const components = {
    av: <ScatterChart rawData={data} />,
    context: <StackChart rawData={data} />,
    feedback: <StackChart rawData={data} feedBack={true} />,
    chron: <LineChart rawData={chronData}/>
  }

  return (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <NavBar />
      </div>

      <UserPicker users={users} selected={setpicked} clean={setdata} />

      <div style={{ margin: 30 }}>
        {data != null
          ?
          <div>
            <Nav justified appearance='subtle' activeKey={tab}>
              <Nav.Item eventKey='av' onSelect={settab}>AV</Nav.Item>
              <Nav.Item eventKey='context' onSelect={settab}>Actividades</Nav.Item>
              <Nav.Item eventKey='feedback' onSelect={settab}>FeedBack</Nav.Item>
              <Nav.Item eventKey='chron' onSelect={settab}>Linea Temporal</Nav.Item>
            </Nav>
            <div style={{ marginTop: 20 }}>
              {components[tab]}
            </div>
          </div>
      :
      null
        }
    </div>
    </div >
  );
}

export default App;
