import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createShopAction } from "../../actions/shopsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function CreateShop({ history }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const dispatch = useDispatch();

  const shopCreate = useSelector((state) => state.shopCreate);
  const { loading, error, shop } = shopCreate;

  console.log(shop);

  const resetHandler = () => {
    setName("");
    setAddress("");
    setEmail("");
    setMobile("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createShopAction(name, address, email, mobile));
    if (!name || !address || !email || !mobile) return;

    resetHandler();
    history.push("/myshops");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Shop Details">
      <Card>
        <Card.Header>Create a new  Details</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                value={address}
                placeholder="Enter Address"
                rows={2}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter the Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="mobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="mobile"
                value={mobile}
                placeholder="Enter Mobile"
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Shop Details
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Fields
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateShop;
