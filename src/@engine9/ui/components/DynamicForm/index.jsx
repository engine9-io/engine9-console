import React from 'react';
import Form from '@rjsf/antd';
import { StyleProvider } from '@ant-design/cssinjs';
import validator from '@rjsf/validator-ajv8';
import { Button, Collapse } from 'antd';

const log = (type) => console.log.bind(console, type);

function DynamicForm({
  form, uiSchema, data, onSubmit, onError,
}) {
  const fieldNames = Object.keys(form.properties || {});
  if (fieldNames.length === 0) return 'This form has no fields to edit';

  // Only deal with fields we've explicitly requested, even if there's others in the form
  const localData = {};

  // only if specified, otherwise database defaults are ignored
  fieldNames.forEach((f) => {
    const config = form.properties[f];
    if (data[f] !== undefined) {
      localData[f] = data[f];
      if (!data[f]) {
        if (config.default !== undefined) {
          localData[f] = config.default;
        } else if (config.type === 'string') {
          localData[f] = '';// because null strings should be filled with something not null
        }
      }
    }
  });

  const localOnSubmit = (formData) => {
    if (typeof onSubmit === 'function') onSubmit(formData);
  };

  const localOnError = (errorInfo) => {
    if (typeof onError === 'function') onError(errorInfo);
  };

  return (
    <StyleProvider>
      <Form
        schema={form}
        uiSchema={uiSchema}
        formData={localData}
        validator={validator}
        onChange={log('changed')}
        onSubmit={({ formData }) => localOnSubmit(formData)}
        onError={localOnError}
      >
        <Button type="primary" htmlType="submit">Save</Button>
      </Form>
      <Collapse items={[
        { key: 'data', label: 'Data JSON', children: <pre>{JSON.stringify(localData, null, 4)}</pre> },
        { key: 'schema', label: 'Schema JSON', children: <pre>{JSON.stringify(form, null, 4)}</pre> },
        { key: 'ui', label: 'UI Schema', children: <pre>{JSON.stringify(uiSchema, null, 4)}</pre> },
      ]}
      />

    </StyleProvider>
  );

  /*
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ ...data, remember: true }}
      onFinish={localOnFinish}
      onFinishFailed={localOnFinishFailed}
      autoComplete="off"
    >
      {form.inputs.map((d) => (
        <Form.Item
          key={d.name}
          label={d.label}
          name={d.name}
          rules={d.rules}
        >
          <Input />
          { (props) => {
            switch (d.type) {
              case 'password': return React.createElement(Input.Password, props);
              default: return React.createElement(Input, props);
            }
          } }
        </Form.Item>
      ))}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
  */
}

export default DynamicForm;
