import { io } from 'socket.io-client';
// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_ENGINE9_DATA_ENDPOINT;
const socket = io(
  URL,
  {
    // credentials need to be set before connecting
    autoConnect: false,
  },
);

export default socket;
