import React from 'react';
import { BlockManager, BasicType } from 'easy-email-core';
import { BlockAttributeConfigurationManager, StandardLayout } from 'easy-email-extensions';
import { EmailEditor, EmailEditorProvider } from 'easy-email-editor';

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
  subject: 'Hello, Engine9',
  content: BlockManager.getBlockByType(BasicType.PAGE).create({}),
};

export default function Message(
  { message, saveMessage },
) {
  if (message?.publish_date) return 'Cannot edit, already published';
  return (
    <EmailEditorProvider
      data={initialValues}
      height="calc(100vh - 72px)"
      autoComplete
      dashed={false}
    >
      {({ values }) => {
        if (typeof saveMessage === 'function')saveMessage({ content: { values } });
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
