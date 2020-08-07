import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import JoblyApi from "../helpers/JoblyApi";
import JobCard from "./JobCard";
import UserContext from "./../userContext";
import { InputGroup, Input, Button } from "reactstrap";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const { _token, user } = useContext(UserContext);
  const [term, setTerm] = useState("");

  const handleSubmit = () => {
    setSearch(term);
  };

  useEffect(() => {
    async function getData() {
      let jobs = await JoblyApi.getJobs({ search: search, _token });
      setJobs(jobs);
      setTerm("");
    }
    if (user) getData();
  }, [_token, setJobs, search, user]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleJobApply = (id) => {
    setJobs((curr) =>
      curr.map((c) => {
        if (c.id === id) {
          return { ...c, state: "applied" };
        }
        return c;
      })
    );
  };
  if (!user) return <Redirect to={"/"} />;

  return (
    <div>
      <InputGroup>
        <Input
          type="text"
          placeholder="enter search term"
          onChange={handleChange}
          value={term}
        />
        <Button onClick={handleSubmit}>submit</Button>
      </InputGroup>
      {jobs.length === 0 && <p>sorry nothing found</p>}

      {jobs.map((job) => (
        <div className=" my-2 rounded" key={job.id}>
          <JobCard job={job} handleJobApply={handleJobApply}></JobCard>
        </div>
      ))}
    </div>
  );
}

export default Jobs;
