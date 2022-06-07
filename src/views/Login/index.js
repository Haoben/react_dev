import { Form, Input, Button, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // 校验完成 开始登录
  const onFinish = (values) => {
    setLoading((loading = true));
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(values);
      }, 1000);
    }).then((res) => {
      console.log(res);
      message.success("登录成功");
      navigate("/HomePage");

      setLoading((loading = false));
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      username: "admin",
      password: "123456",
    });
  });

  return (
    <div style={{ width: "500px", margin: "0 auto", paddingTop: "200px" }}>
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        onFinish={onFinish}
        onFinishFailed={() => {}}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            登 录
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
