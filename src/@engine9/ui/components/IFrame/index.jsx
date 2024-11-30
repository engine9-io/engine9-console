import React from 'react';

export default function IFrame(props) {
  const { content, title = 'iframe-content' } = props;
  const writeHTML = (_frame) => {
    if (!_frame) {
      return;
    }
    const frame = _frame;

    const doc = frame.contentDocument;
    doc.open();
    doc.write(content);
    doc.close();
    if (frame.style) {
      const height = frame?.contentWindow?.document?.body?.scrollHeight || 300;
      frame.style.width = '100%';
      frame.style.height = `${height}px`;
    }
    if (frame?.contentWindow?.document?.body?.style) {
      frame.contentWindow.document.body.style.zoom = 0.8;
    }
  };

  return (
    <iframe
      // referrerPolicy="unsafe-url" --this doesn't actually fix anything about unsafe links
      title={title}
      className="iframe-html"
      src="about:blank"
      scrolling="no"
      frameBorder="0"
      ref={writeHTML}
    />
  );
}
