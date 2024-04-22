import React from 'react';
import {
  Button, Checkbox, Form, Input,
} from 'antd';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function DynamicForm({ form, data }) {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ ...data, remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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

      <Form.Item
        label="Username"
        name="username"
        // rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        // rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default DynamicForm;
