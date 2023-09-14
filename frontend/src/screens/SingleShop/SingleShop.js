import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteShopAction, updateShopAction } from "../../actions/shopsActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

function SingleShop({ match, history }) {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const shopUpdate = useSelector((state) => state.shopUpdate);
  const { loading, error } = shopUpdate;

  const shopDelete = useSelector((state) => state.shopDelete);
  const { loading: loadingDelete, error: errorDelete } = shopDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteShopAction(id));
    }
    history.push("/myshops");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/shops/${match.params.id}`);

      setName(data.name);
      setAddress(data.address);
      setEmail(data.email);
      setMobile(data.mobile);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setName("");
    setAddress("");
    setEmail("");
    setMobile("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateShopAction(match.params.id, name, address, email, mobile));
    if (!name || !address || !email ||!mobile) return;

    resetHandler();
    history.push("/myshops");
  };

  return (
    <MainScreen title="Edit Shop">
      <Card>
        <Card.Header>Edit your Shop</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Address"
                rows={2}
                value={address}
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
            <Button variant="primary" type="submit">
              Update Shop
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Shop
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleShop;
