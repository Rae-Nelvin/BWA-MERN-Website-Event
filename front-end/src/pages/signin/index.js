import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import axios from "axios";
import SAlert from "../../components/Alert";
import { Navigate, useNavigate } from "react-router-dom";
import { config } from "../../configs";
import SForm from "./form";

export default function PageSignIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${config.api_host_dev}/auth/signin`, form);
      // console.log(res.data);
      localStorage.setItem("token", res.data);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setAlert({
        status: true,
        message: error?.response?.data.msg ?? "Internal server error",
        type: "danger",
      });
      setIsLoading(false);
    }
  };

  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/" replace={true} />;

  return (
    <Container md={12} className="my-5">
      <div className="m-auto" style={{ width: "50%" }}>
        {alert.status && <SAlert message={alert.message} type={alert.type} />}
      </div>
      <Card style={{ width: "50%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center">Form Signin</Card.Title>
          <SForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}
