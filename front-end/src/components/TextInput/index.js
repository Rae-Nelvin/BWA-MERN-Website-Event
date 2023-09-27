import React from "react";
import { Form } from "react-bootstrap";

export default function TextInput({
  name,
  value,
  type,
  onChange,
  placeholder,
}) {
  return (
    <Form.Control
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}
