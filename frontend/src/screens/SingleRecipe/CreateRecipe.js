import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createRecipeAction } from "../../actions/recipesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateRecipe({ history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [Level, setLevel] = useState("");

  const dispatch = useDispatch();

  const recipeCreate = useSelector((state) => state.recipeCreate);
  const { loading, error, recipe } = recipeCreate;

  console.log(recipe);

  const resetHandler = () => {
    setTitle("");
    setLevel("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createRecipeAction(title, content, Level));
    if (!title || !content || !Level) return;

    resetHandler();
    history.push("/myrecipes");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Recipe">
      <Card>
        <Card.Header>Create a new Recipe</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Method</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the method"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Recipe Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Level</Form.Label>
              <Form.Control
                type="content"
                value={Level}
                placeholder="Enter the Level (Hard,Medium,Easy)"
                onChange={(e) => setLevel(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Recipe
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
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

export default CreateRecipe;
