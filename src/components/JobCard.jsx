import React, { useContext } from "react";
import JoblyApi from "./../helpers/JoblyApi";
import UserContext from "./../userContext";
import { Redirect } from "react-router-dom";
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap";

function JobCard({ job, handleJobApply }) {
  const { _token, user } = useContext(UserContext);
  const { id, title, equity, salary, state } = job;

  const handleApply = () => {
    JoblyApi.applyJob(id, { _token });
    handleJobApply(id);
  };

  if (!user) return <Redirect to={"/"} />;

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <h5>{title}</h5>
        </CardTitle>
        <CardText>Equity: {equity}</CardText>
        <CardText>Salary: {salary}</CardText>
        <Button onClick={handleApply} disabled={state !== null}>
          {state ? "applied" : "apply"}
        </Button>
      </CardBody>
    </Card>
  );
}

export default JobCard;
