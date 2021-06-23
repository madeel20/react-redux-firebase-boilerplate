import React, { useEffect, useState } from "react";
import { Form, Input, Button } from 'antd';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { forgotPassword } from "../../store/Actions/UsersActions";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {

    // if user logged in already move to account page
    if (auth.currentUser) {
      history.push('/my-account');
    }

  }, [auth.currentUser]);

  const handleSubmit = (values) => {

    dispatch(forgotPassword(values.email, () => {
      // show message to user after email sent successfully!
      setEmailSent(true);
    }));

  }

  // get redux state
  const stateProps = useSelector(({ user }) => { return { ...user } });

  const { forgotPasswordLoading } = stateProps;

  if (emailSent) {
    return <div className="forgot-password-container">
      <Form className="inner-container">
        <h3> Forgot password </h3>
        <p> A password reset link has been sent to your email! </p>
      </Form>
    </div>
  }

  return (
    <div className="forgot-password-container">
      <Form onFinish={handleSubmit} className="inner-container">

        <h3>Forgot Your Password?</h3>
        <p>Enter your email address and we will send you a link to reset your password.</p>


        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input disabled={forgotPasswordLoading} type="email" placeholder="Email" />
        </Form.Item>

        <Button loading={forgotPasswordLoading} htmlType="submit" className="c-button large">
          Submit
        </Button>

        <div className="more-pages">
          <span>New to ERio? <Link to="sign-up">Register Now</Link></span>
        </div>

      </Form>
    </div>
  );
}
