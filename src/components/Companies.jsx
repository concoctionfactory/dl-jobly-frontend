import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import JoblyApi from "../helpers/JoblyApi";
import { Link } from "react-router-dom";
import CompanyCard from "./CompanyCard";
import UserContext from "./../userContext";
import { InputGroup, Input, Button } from "reactstrap";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const { _token, user } = useContext(UserContext);
  const [term, setTerm] = useState("");

  useEffect(() => {
    async function getData(search = "") {
      let companies = await JoblyApi.getCompanies({ search: search, _token });
      console.log(companies);
      setCompanies(companies);
      setTerm("");
    }

    if (user) getData();
  }, [_token, setCompanies, search, user]);

  const handleSubmit = () => {
    setSearch(term);
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  if (!user) return <Redirect to={"/"} />;

  return (
    <div>
      <InputGroup>
        <Input
          type="text"
          placeholder="enter search term"
          onChange={handleChange}
          value={search}
        />
        <Button onClick={handleSubmit}>submit</Button>
      </InputGroup>
      {companies.length === 0 && <p>sorry nothing found</p>}

      {companies.map((c) => (
        <div key={c.handle} className=" my-2 rounded">
          <Link to={`/companies/${c.handle}`}>
            <CompanyCard company={c}></CompanyCard>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Companies;
