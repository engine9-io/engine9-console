import React from 'react';
import socket from '../socket';

export default function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button type="button" onClick={connect}>Connect</button>
      <button type="button" onClick={disconnect}>Disconnect</button>
    </>
  );
}
