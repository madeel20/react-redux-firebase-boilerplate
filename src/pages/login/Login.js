import React, { useEffect } from "react";
import { Form, Input, Button } from 'antd';
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, signIn } from "../../store/Actions/UsersActions";
import { getWallet } from "../../store/Actions/WalletActions";

export default function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {

    // if user logged in already move to account page
    if (auth.currentUser) {
      history.push('/my-account');
    }

  }, [auth.currentUser]);

  const handleSubmit = (values) => {
    dispatch(signIn(values, () => {
      // get User info 
      dispatch(getUserData());
      dispatch(getWallet());
      // after sign in move to home
      history.push('/my-account');
    }));
  }

  // get redux state
  const stateProps = useSelector(({ user }) => { return { ...user } });

  const { signInLoading } = stateProps;

  return (
    <div className="login-container">
      <Form onFinish={handleSubmit} className="inner-container">

        <h3>Welcome Back!</h3>
        <p>Sign in and find the best influencers for your business.</p>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" placeholder="Email" disabled={signInLoading} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            iconRender={() => <a>Show</a>}
            placeholder="Password"
            disabled={signInLoading}
          />
        </Form.Item>

        <Button htmlType="submit" className="c-button large" loading={signInLoading}>
          Log in
        </Button>

        <div className="more-pages">
          <Link to="/forgot-password">Password lost?</Link>
          <span>New to ERio? <Link to="sign-up">Register Now</Link></span>
        </div>

      </Form>
    </div>
  );
}
