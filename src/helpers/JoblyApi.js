import axios from "axios";

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    // let token = JSON.parse(window.localStorage.getItem("token"));
    // if (token) paramsOrData._token = token;
    // paramsOrData._token = // for now, hardcode token for "testing"
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc" +
    //   "3RpbmciLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU1MzcwMzE1M30." +
    //   "COmFETEsTxN_VfIlgIKw0bYJLkvbRQNgO1XCSE8NZ0U";
    console.debug("API Call:", endpoint, paramsOrData, verb);
    const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
    try {
      return (
        await axios({
          method: verb,
          url: `${BASE_URL}/${endpoint}`,
          [verb === "get" ? "params" : "data"]: paramsOrData,
        })
      ).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompany(handle, data) {
    let res = await this.request(`companies/${handle}`, data);
    return res.company;
  }
  static async getCompanies(data) {
    console.log(data);

    let res = await this.request(`companies`, data);
    return res.companies;
  }

  static async getJobs(data) {
    let res = await this.request(`jobs`, data);
    return res.jobs;
  }

  static async login(data) {
    try {
      let res = await this.request(`login`, data, "post");
      window.localStorage.setItem("_token", JSON.stringify(res.token));
    } catch (error) {
      return { errors: error };
    }
  }

  static async signUp(data) {
    try {
      let res = await this.request(`users`, data, "post");

      window.localStorage.setItem("_token", JSON.stringify(res.token));
    } catch (error) {
      return { errors: error };
    }
  }

  static async getCurrUser(username, data) {
    let res = await this.request(`users/${username}`, data);
    return res.user;
  }

  static async updateUser(username, data) {
    // let newData = delete data.username;
    console.log(data);

    try {
      let res = await this.request(`users/${username}`, data, "patch");
      return res.user;
    } catch (error) {
      return { errors: error };
    }
  }

  static async applyJob(id, data) {
    let res = await this.request(`jobs/${id}/apply`, data, "post");
    return res.job;
  }
}

export default JoblyApi;
