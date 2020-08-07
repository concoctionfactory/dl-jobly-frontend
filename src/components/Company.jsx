import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import JoblyApi from "../helpers/JoblyApi";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";
import CompanyCard from "./CompanyCard";
import UserContext from "./../userContext";

function Company() {
  const { handle } = useParams();
  const [company, setCompany] = useState({});
  const { _token, user } = useContext(UserContext);

  useEffect(() => {
    async function getData() {
      let company = await JoblyApi.getCompany(handle, { _token });
      console.log(company);
      setCompany(company);
    }
    if (user) getData();
  }, [handle, _token, user]);
  const jobs = company.jobs || [];

  if (!user) return <Redirect to={"/"} />;

  return (
    <div>
      <CompanyCard company={company}></CompanyCard>
      {jobs.map((job) => (
        <div className=" my-2 rounded" key={job.id}>
          <JobCard job={job}></JobCard>
        </div>
      ))}
    </div>
  );
}

export default Company;
