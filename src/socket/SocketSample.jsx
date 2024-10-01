import React, { useState, useEffect } from 'react';
import socket from './socket';
import ConnectionState from './components/ConnectionState';
import ConnectionManager from './components/ConnectionManager';
import Events from './components/Events';
import MyForm from './components/MyForm';

export default function Sample() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [pongEvents, setPongEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onPongEvent(value) {
      setPongEvents((previous) => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('pong', onPongEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onPongEvent);
    };
  }, []);

  return (
    <div className="socket-sample">
      <ConnectionState isConnected={isConnected} />
      <Events events={pongEvents} />
      <ConnectionManager />
      <MyForm />
    </div>
  );
}
