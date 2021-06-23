import React, { useEffect } from "react";
import { Form, Input, Button } from 'antd';
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserData, signup } from "../../store/Actions/UsersActions";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { getWallet } from "../../store/Actions/WalletActions";

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {

    // if user logged in already move to account page
    if (auth.currentUser) {
      history.push('/my-account');
    }

  }, [auth.currentUser]);

  const handleSubmit = (values) => {

    dispatch(signup(values, () => {
      // get User info 
      dispatch(getUserData());
      dispatch(getWallet());
      // after signup move to my account
      history.push('/my-account');
    }));

  }

  // get redux state
  const stateProps = useSelector(({ user }) => { return { ...user } });

  const { signUpLoading } = stateProps;

  return (
    <div className="signup-container">
      <Form onFinish={handleSubmit} className="inner-container">

        <h3>Register</h3>
        <p>Register and access to the best influencers for your business.</p>

        <div className="form-row">
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input type="text" placeholder="First name" disabled={signUpLoading} />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input type="text" placeholder="Last name" disabled={signUpLoading} />
          </Form.Item>
        </div>

        <Form.Item
          name="email"
          className="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" placeholder="Email" disabled={signUpLoading} />
        </Form.Item>

        <Form.Item
          name="password"
          className="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            iconRender={() => <a>Show</a>}
            placeholder="Password"
            disabled={signUpLoading}
          />
        </Form.Item>

        <div className="more-pages">
          <span>By registering, you agree to our  <Link>Terms</Link>, <Link>Data <br /> policy</Link> and <Link>Cookies Policy</Link>.</span>
        </div>


        <Button loading={signUpLoading} htmlType="submit" className="c-button large">
          Register
        </Button>

        <div className="more-pages">
          <span>Already have an account? <Link to="/sign-in">Log In</Link></span>
        </div>

      </Form>
    </div>
  );
}
