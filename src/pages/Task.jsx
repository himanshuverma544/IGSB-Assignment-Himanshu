import { useState, useRef, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { signUp, signIn, signOut } from "../redux/slices/users";

import { 
  Container, 
  Form, 
  FormGroup,
  InputGroup,
  Input, 
  Button, 
  FormText, 
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem 
} 
from "reactstrap";
import { toast } from "react-toastify";

import { 
  setCustomCookie,
  clearCustomCookie
}
from "../utils/functions";

import { 
  DEFAULT_USER, 
  SIGN_IN, 
  SIGN_UP, 
  SIGN_OUT, 
  AS_PER,
  DEFAULT_DROPDOWN_TOGGLE_TEXT,
  SECURITY_QUES_OPTIONS,
  DEFAULT_TEXT_COLOR, 
  PLACEHOLDER_TEXT_COLOR,
  BACKGROUND_COLOR,
  BACKGROUND_SELECTED_COLOR,
  CNAME_SIGNED_IN_USER
} 
from "../utils/constants";


const Task = () => {

  const [dropdown, setDropdown] = useState({
    toggleText: DEFAULT_DROPDOWN_TOGGLE_TEXT,
    openStatus: false
  });

  const toggleOpenStatus = useCallback(() =>
    setDropdown(prev => {
      return {...prev, openStatus: !prev.openStatus}
    })
  , []);

  const chosenDropdownItem = useCallback(securityQue => 
    setDropdown(prev => {
      return {...prev, toggleText: securityQue}
    })
  , []);

  const handleSecurityQuesOptions = useCallback(chosenSecurityQue => {
    chosenDropdownItem(chosenSecurityQue);
  }, [chosenDropdownItem]);


  const userDispatch = useDispatch();
  const { users: existingUsers, signedInUser } = useSelector(state => state.usersReducer);

  const [status, setStatus] = useState(signedInUser === DEFAULT_USER.username ?
    SIGN_IN.name :
    SIGN_OUT.name
  );

  const usernameNode = useRef(null);
  const passwordNode = useRef(null);
  const confirmPasswordNode = useRef(null);
  const securityQueNode = useRef(null);
  const securityQueAnsNode = useRef(null);


  const isAuthenticated = useCallback(() => (
    status === SIGN_OUT.name
  ), [status]);

  const getUser = useCallback(currentUsername => {

    const existingUser = existingUsers.find(existingUser => (
      existingUser.username === currentUsername
    ));

    return existingUser;
  }, [existingUsers]);

  
  const handleSubmit = useCallback(event => {

    event.preventDefault();
    
    const username = usernameNode.current && usernameNode.current.value.toLowerCase();
    const password = passwordNode.current && passwordNode.current.value;
    const confirmPassword = confirmPasswordNode.current && confirmPasswordNode.current.value;
    const securityQue = dropdown.toggleText;
    const securityQueAns = securityQueAnsNode.current && securityQueAnsNode.current.value;

    switch (status) {
      
      case SIGN_UP.name:

        if (username.includes(DEFAULT_USER.username)) {
          toast(`Using ${DEFAULT_USER.username} for the username is not allowed`, {type: "warning"});
        }
        else if (getUser(username)) {
          toast("Username already exists", {type: "error"});
        }
        else if (username.length < 4 || password.length < 8) {
          toast("Username and Password length must be equal to and greater than 4 and 8 respectively", {type: "error"});
        }
        else if (password !== confirmPassword) {
          toast("Passwords do not match", {type: "error"});
        }
        else if (DEFAULT_DROPDOWN_TOGGLE_TEXT === securityQue) {
          toast("Please choose your Security Question", {type: "error"});
        }
        else if (securityQueAns.length <= 0) {
          toast("Please answer your Security Question", {type: "error"});
        }
        else if (password === confirmPassword) {    
          console.log({securityQueAns});
          userDispatch(
            signUp({
              username,
              password,
              securityQue,
              securityQueAns: securityQueAns.toLowerCase()
            })
          );
          
          setCustomCookie(CNAME_SIGNED_IN_USER, username);

          toast("Signed Up Successfully", {type: "success"});
          setStatus(SIGN_OUT.name);
        }
        break;

      case SIGN_IN.name: 
        
        if (!getUser(username)) {
          toast("Username does not exist", {type: "error"});
        }
        else if (getUser(username)) {
          const { password: existingPassword } = getUser(username);

          if (existingPassword !== password) {
            toast("Incorrect password", {type: "error"});
          }
          else if (existingPassword === password) {
            userDispatch(
              signIn({ 
                username,
                password 
              })
            );

            setCustomCookie(CNAME_SIGNED_IN_USER, username);

            toast("Signed In Successfully", {type: "success"});
            setStatus(SIGN_OUT.name);
          }
        }
        break;

      case SIGN_OUT.name:

        userDispatch(signOut());
        clearCustomCookie(CNAME_SIGNED_IN_USER);
        toast("Signed Out Successfully", {type: "success"});
        setStatus(SIGN_IN.name);
        break;

      default:
        break;
    }
    
  }, [status, dropdown.toggleText, getUser, userDispatch]);

  
  return (
    <section>
      <Container className="auth-form-cont gx-0" fluid>
        <Form className="auth-form" onSubmit={handleSubmit}>
          <h1 className="form-heading">
            {`${AS_PER[status].heading} ${isAuthenticated() ?
              signedInUser :
              ""
            }`}
          </h1>
          <hr/>
          {!isAuthenticated() &&
            <>
              <FormGroup>
                <Input
                  id="username"
                  innerRef={usernameNode}
                  name="username"
                  placeholder="Enter Username"
                  type="text"
                  autoComplete="off"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  id="password"
                  innerRef={passwordNode}
                  name="password"
                  placeholder="Enter Password"
                  type="password"
                />
              </FormGroup>
              {AS_PER[status].show &&
                <> 
                  <FormGroup>
                    <Input
                      id="confirm-password"
                      innerRef={confirmPasswordNode}
                      name="confirm-password"
                      placeholder="Confirm Password"
                      type="password"
                    />
                  </FormGroup>
                  <FormGroup className="choose-group">
                    <InputGroup className="choose-input-group">
                      <Dropdown isOpen={dropdown.openStatus} toggle={toggleOpenStatus}>
                        <DropdownToggle 
                          className="choose-dropdown" 
                          innerRef={securityQueNode}
                          style={{ 
                            color: (DEFAULT_DROPDOWN_TOGGLE_TEXT === dropdown.toggleText) ?
                            PLACEHOLDER_TEXT_COLOR : 
                            DEFAULT_TEXT_COLOR,
                            backgroundColor: (DEFAULT_DROPDOWN_TOGGLE_TEXT === dropdown.toggleText) ?
                            BACKGROUND_COLOR :
                            BACKGROUND_SELECTED_COLOR
                          }} 
                          caret
                        >
                          {dropdown.toggleText}
                        </DropdownToggle>
                        <DropdownMenu className="choose-dropdown-menu">
                          {SECURITY_QUES_OPTIONS.map((option, index) => (
                            <DropdownItem
                              key={index} 
                              className="py-2" 
                              onClick={event => 
                                handleSecurityQuesOptions(event.target.innerText)
                              }
                            >
                              {option}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </InputGroup>
                    {DEFAULT_DROPDOWN_TOGGLE_TEXT !== dropdown.toggleText &&
                      <InputGroup className="mt-3">
                        <Input
                          id="security-que-ans"
                          innerRef={securityQueAnsNode}
                          name="security-question-answer"
                          placeholder="Answer Your Question"
                          type="text"
                          autoComplete="off"
                        />
                      </InputGroup>
                    }
                  </FormGroup>
                </>
              }
            </>
          }
          <FormGroup>
            <Button
              className="auth-btn"
              color="dark"
              block
            >
              {AS_PER[status].name}
            </Button>
          </FormGroup>
          {(!AS_PER[status].show && !isAuthenticated()) &&
            <FormGroup>
              <Button
                className="forget-password-btn text-dark"
                type="button"
                color="link"
              >
                Forget Your Password
              </Button>
            </FormGroup>
          }
          <hr/>
          <FormGroup>
            <FormText>
              {AS_PER[status].switchMsg}
              {!isAuthenticated() &&
                <Button 
                  className="auth-switch-btn text-dark"
                  color="link"
                  onClick={() => setStatus(AS_PER[status].switchTitle)}
                >
                  {AS_PER[status].switchTitle}
                </Button>
              }
            </FormText>
          </FormGroup>
        </Form>
      </Container>
    </section>
  );
}

export default Task;