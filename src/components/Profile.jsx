import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import JoblyApi from "./../helpers/JoblyApi";
import UserContext from "./../userContext";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";

function Profile() {
  const { user, _token } = useContext(UserContext);
  const initalForm = {
    password: "",
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    photo_url: user.photo_url || "",
  };
  const [form, setForm] = useState(initalForm);
  useEffect(() => {
    setForm(initalForm);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((curr) => ({ ...curr, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (form.photo_url === "") delete form.photo_url;
    delete form.errors;
    delete form.success;
    let data = await JoblyApi.updateUser(user.username, { ...form, _token });
    if (data && data.errors) {
      setForm((curr) => ({ ...curr, errors: data.errors }));
      console.log(form);
    } else {
      setForm((curr) => ({ ...curr, success: "user updated" }));
    }
  };

  if (!user) return <Redirect to={"/"} />;

  return (
    <div>
      <Form>
        <FormGroup>
          <Label>username</Label>
          <p>{form.username}</p>
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

        <FormGroup>
          <Label htmlFor="photo_url">photo url</Label>
          <Input
            type="text"
            id="photo_url"
            name="photo_url"
            value={form.photo_url}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password"> reenter password</Label>
          <Input
            type="text"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </FormGroup>
        {form.success && (
          <Alert>
            <p>{form.success}</p>
          </Alert>
        )}
        {form.errors && (
          <Alert>
            {form.errors.map((err, idx) => (
              <p key={idx}>{err}</p>
            ))}
          </Alert>
        )}
        <Button onClick={handleUpdate} disabled={form.password === ""}>
          submit
        </Button>
      </Form>
    </div>
  );
}

export default Profile;
