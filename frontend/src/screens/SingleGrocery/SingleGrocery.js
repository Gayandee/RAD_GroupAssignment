import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroceryAction, updateGroceryAction } from "../../actions/groceriesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";

function SingleGrocery({ match, history }) {
  const [heading, setGroceryHeading] = useState();
  const [description, setDescription] = useState();
  const [priorityLevel, setPriorityLevel] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const groceryUpdate = useSelector((state) => state.groceryUpdate);
  const { loading, error } = groceryUpdate;

  const groceryDelete = useSelector((state) => state.groceryDelete);
  const { loading: loadingDelete, error: errorDelete } = groceryDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteGroceryAction(id));
    }
    history.push("/mygroceries");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/groceries/${match.params.id}`);

      setGroceryHeading(data.Heading);
      setDescription(data.Description);
      setPriorityLevel(data.PriorityLevel);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setGroceryHeading("");
    setPriorityLevel("");
    setDescription("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateGroceryAction(match.params.id, heading, description, priorityLevel));
    if (!heading || !description || !priorityLevel) return;

    resetHandler();
    history.push("/mygroceries");
  };

  return (
    <MainScreen title="Edit Item">
      <Card>
        <Card.Header>Edit your Item</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="heading">
              <Form.Label>Heading</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the heading"
                value={heading}
                onChange={(e) => setGroceryHeading(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Grocery</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            {description && (
              <Card>
                <Card.Header>Grocery Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{description}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="description">
              <Form.Label>Priority Level (1-10)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Priority Level"
                value={priorityLevel}
                onChange={(e) => setPriorityLevel(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Item
            </Button>
            <Button
              className="mx-2"
              variant="success"
              onClick={() => deleteHandler(match.params.id)}
            >
              Done
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

export default SingleGrocery;
