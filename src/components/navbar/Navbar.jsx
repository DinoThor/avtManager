import { Navbar, Nav, Modal } from 'rsuite';
import { useEffect, useState } from 'react';

import CloseIcon from '@rsuite/icons/Close';
import MinusIcon from '@rsuite/icons/Minus';
import QrcodeIcon from '@rsuite/icons/Qrcode';

import QRCode from "react-qr-code";

import './titleBar.css'

function NavBar() {
  const [qrVisible, setqrVisible] = useState(false);
  const [url, seturl] = useState(null);

  useEffect(() => {
    window.electronAPI.publicUrl().then((url) => seturl(url));
  }, []);

  return (
    <Navbar className='title-bar' appearance='inverse'>
      <Navbar.Brand className='button'>AVT MANAGER</Navbar.Brand>
      <Nav>
        <Nav.Item
          className='button'
          icon={<QrcodeIcon />}
          onSelect={() => { setqrVisible(true); }}
        >
          QR
        </Nav.Item>
      </Nav>
      <Nav pullRight>
        <Nav.Item
          className='button'
          icon={<MinusIcon />}
          onSelect={() => window.electronAPI.minimizeWindow()}
        />
        <Nav.Item
          className='button'
          icon={<CloseIcon />}
          onSelect={() => { window.electronAPI.closeWindow() }}
        />
      </Nav>

      <Modal open={qrVisible} onClose={() => { setqrVisible(false) }}>
        <Modal.Header>
          <Modal.Title>Backup QR</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          {url !== undefined ? <QRCode value={url} /> : null}
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

export default NavBar;