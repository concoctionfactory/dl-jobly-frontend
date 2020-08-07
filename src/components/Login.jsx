import React, { useState, useContext } from "react";
import JoblyApi from "./../helpers/JoblyApi";
import { useHistory } from "react-router-dom";
import UserContext from "./../userContext";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Alert,
} from "reactstrap";
import classnames from "classnames";
function Login() {
  const { signIn } = useContext(UserContext);
  const history = useHistory();
  const initalForm = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  };
  const [form, setForm] = useState(initalForm);
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((curr) => ({ ...curr, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let data = await JoblyApi.login(form);
    if (data && data.errors) {
      setForm((curr) => ({ ...curr, errors: data.errors }));
      console.log(form);
    } else {
      console.log(data);
      setForm(initalForm);
      signIn();
      history.push("/jobs");
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    let data = await JoblyApi.signUp(form);
    if (data && data.errors) {
      setForm((curr) => ({ ...curr, errors: data.errors }));
      console.log(form);
    } else {
      setForm(initalForm);
      signIn();
      history.push("/jobs");
    }
  };
  return (
    <div>
      <Nav tabs className="justify-content-end">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Login
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Sign Up
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Card body>
            <Form>
              <FormGroup>
                <Label htmlFor="username">username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">password</Label>
                <Input
                  type="text"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </FormGroup>
              {form.errors && (
                <Alert>
                  {form.errors.map((err) => (
                    <p>{err}</p>
                  ))}
                </Alert>
              )}

              <Button onClick={handleLogin}>submit</Button>
            </Form>
          </Card>
        </TabPane>

        <TabPane tabId="2">
          <Card body>
            <Form>
              <FormGroup>
                <Label htmlFor="username">username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">password</Label>
                <Input
                  type="text"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="firstName">firstName</Label>
                <Input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="lastName">lastName</Label>
                <Input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">email</Label>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </FormGroup>
              {form.errors && (
                <Alert>
                  {form.errors.map((err, idx) => (
                    <p key={idx}>{err}</p>
                  ))}
                </Alert>
              )}
              <Button onClick={handleSignUp}>submit</Button>
            </Form>
          </Card>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Login;
