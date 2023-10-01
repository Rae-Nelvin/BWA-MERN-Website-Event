import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SBreadcrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import Form from "./form";

export default function CategoryCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
  });
  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // const response = await axios.post("/categories", form);
      navigate("/categories");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: error.response.data.message,
      });
    }
  };

  return (
    <Container>
      <SBreadcrumb
        textSecond={"Categories"}
        urlSecond={"/categories"}
        textThird="Create"
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}
