import React from 'react';

export default function Events({ events }) {
  return (
    <ul>
      <li>Received events:</li>
      {
      // eslint-disable-next-line react/no-array-index-key
      events.map((event, index) => <li key={index}>{ event }</li>)
    }
    </ul>
  );
}
