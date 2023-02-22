import axios from "axios";

export async function login(values: { username: string; password: string }) {
  return await axios.post(
    "http://localhost:8080/auth/login",
    {
      username: values.username,
      password: values.password,
    },
    { withCredentials: true }
  );
}

export async function signin(values: {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
}) {
  return await axios.post(
    "http://localhost:8080/auth/signin",
    {
      firstname: values.firstname,
      lastname: values.lastname,
      username: values.username,
      password: values.password,
      email: values.email,
    },
    { withCredentials: true }
  );
}

export async function fetchUser() {
  return await axios.get("http://localhost:8080/users/user", {
    withCredentials: true,
  });
}
