import React from 'react';

type Props = {};

const Clipboard = (props: Props) => {
  return (
    <div className="card">
      <h2 className="color-sec-3 pd-y-md">Persistent Clipboard</h2>
      <p className="pd-md">Click to copy to clipboard. Paste to add it here.</p>
      <div className="sub-content">Clipboard content</div>
    </div>
  );
};

export default Clipboard;
