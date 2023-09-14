import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteGroceryAction, listGroceries } from "../../actions/groceriesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function MyGroceries({ history, search }) {
  const dispatch = useDispatch();

  const groceryList = useSelector((state) => state.groceryList);
  const { loading, error, groceries } = groceryList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const groceryDelete = useSelector((state) => state.groceryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = groceryDelete;

  const groceryCreate = useSelector((state) => state.groceryCreate);
  const { success: successCreate } = groceryCreate;

  const groceryUpdate = useSelector((state) => state.groceryUpdate);
  const { success: successUpdate } = groceryUpdate;

  useEffect(() => {
    dispatch(listGroceries());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteGroceryAction(id));
    }
  };

  return (
    <MainScreen title={`My Grocery List`}>
      {console.log(groceries)}
      <Link to="/creategrocery">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create Grocery List
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {groceries &&
        groceries
          .filter((filteredGrocery) =>
            filteredGrocery.Heading.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((grocery) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={grocery._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(grocery)}
                    style={{
                      color: "blue",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {grocery.Heading}
                    </Accordion.Toggle>
                  </span>

                  <div>

                    {/* Done */}

                    {/* <Button
                      variant="success"
                      className="mx-2"                      
                      // call the function strikeThrough when onClick the Done button and strike through the card title
                      // onClick={strikeThrough}
                      >Done</Button> */}

                    <Button href={`/grocery/${grocery._id}`}>Edit</Button>
                    <Button
                      variant="success"
                      className="mx-2"
                      onClick={() => deleteHandler(grocery._id)}
                    >
                      Done
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                      Priority Levels - {grocery.PriorityLevel}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{grocery.Description}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {grocery.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default MyGroceries;
