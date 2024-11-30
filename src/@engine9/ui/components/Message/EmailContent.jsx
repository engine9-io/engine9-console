import React from 'react';
import { BlockManager, BasicType } from 'easy-email-core';
import { BlockAttributeConfigurationManager, StandardLayout } from 'easy-email-extensions';
import { EmailEditor, EmailEditorProvider } from 'easy-email-editor';
import IFrame from '../IFrame';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';

// theme, If you need to change the theme, you can make a duplicate in https://arco.design/themes/design/1799/setting/base/Color
import '@arco-themes/react-easy-email-theme/css/arco.css';

const DefaultPageConfigPanel = BlockAttributeConfigurationManager.get(BasicType.PAGE);
BlockAttributeConfigurationManager.add({
  [BasicType.PAGE]: () => (
    <DefaultPageConfigPanel
      hideSubject
      hideSubTitle
    />
  ),
});

const initialValues = {
  content: BlockManager.getBlockByType(BasicType.PAGE).create({}),
};

export default function EmailContent(
  { message, saveMessage },
) {
  if (!message.id) return 'The message id must be created before editing';

  const mContent = message.content;

  if (message?.publish_date) return <IFrame content={mContent.html} />;

  initialValues.content = mContent.easyEmailConfig || initialValues.content;
  if (typeof initialValues.content === 'string')initialValues.content = JSON.parse(initialValues.content);

  return (
    <EmailEditorProvider
      data={initialValues}
      height="calc(100vh - 72px)"
      autoComplete
      dashed={false}
    >
      {(easyEmailOutput) => {
        const easyEmailConfig = easyEmailOutput.values.content;
        const newMessage = {
          id: message.id,
          content: {
            easyEmailConfig,
          },
        };
        if (typeof saveMessage === 'function') { saveMessage(newMessage); }
        return (
          <StandardLayout
            compact={false}
            showSourceCode
          >
            <EmailEditor />
          </StandardLayout>
        );
      }}
    </EmailEditorProvider>
  );
}
