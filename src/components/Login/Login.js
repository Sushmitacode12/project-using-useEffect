import React, { useState, useEffect, useReducer, useContext  } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../UI/store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if(action.type === 'user-input') {
    return {value: action.val, isValid: action.val.includes('@') };
  }
  if(action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return { value: '', isValid: false};
};

const passwordReducer = (state, action) => {
  if(action.type === 'user-input') {
    return {value: action.val, isValid: action.val.trim().length > 6};
  }
  if(action.typr === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.val.trim().length > 6};
  }
  return {value: '', isValid: false};
};




const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value:'',
    isValid: 'null',
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: 'null',
  });

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    console.log('Effect Running');

    return () => {
      console.log('Effect Running');
    };
  }, []);

  const {isValid: emailIsValid } = emailState;
  const {isValid: passwordIsValid } = passwordState;


  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log('cleanup');
      clearTimeout(identifier);
    };
  }, [emailState, passwordState]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'user-input', val: event.target.value});

    // setFormIsValid(
    //   emailState.value.includes('@') && passwordState.isValid
    // );
  };
  

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'user-input', val: event.target.value});

    setFormIsValid(
      passwordState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          id="email" 
          label="E-Mail" 
          type="email" 
          isValid={emailIsValid} 
          value={emailState.value} 
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
          <Input
            id="password"
            label="Password"
            type="password"
            isValid={passwordIsValid}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
