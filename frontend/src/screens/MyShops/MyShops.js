import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteShopAction, listShops } from "../../actions/shopsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function MyShops({ history, search }) {
  const dispatch = useDispatch();

  const shopList = useSelector((state) => state.shopList);
  const { loading, error, shops } = shopList;

  // const filteredRecipes = recipes.filter((recipe) =>
  //   recipe.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const shopDelete = useSelector((state) => state.shopDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = shopDelete;

  const shopCreate = useSelector((state) => state.shopCreate);
  const { success: successCreate } = shopCreate;

  const shopUpdate = useSelector((state) => state.shopUpdate);
  const { success: successUpdate } = shopUpdate;

  useEffect(() => {
    dispatch(listShops());
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
      dispatch(deleteShopAction(id));
    }
  };

  return (
    <MainScreen title={`My Shops`}>
      {console.log(shops)}
      <Link to="/createshop">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Shop
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {shops &&
        shops
          .filter((filteredShop) =>
            filteredShop.name.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((shop) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={shop._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(recipe)}
                    style={{
                      color: "black",
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
                      {shop.name}
                    </Accordion.Toggle>
                  </span>

                  <div>
                    <Button href={`/shop/${shop._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(shop._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Name - {shop.name}
                      </Badge>
                    </h4>
                    <h4>
                      <Badge variant="success">
                        Email - {shop.email}                   
                      </Badge>
                    </h4>
                    <h4>
                      <Badge variant="success">
                        Mobile - {shop.mobile}                      
                      </Badge>
                    </h4>
                    
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{shop.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {shop.createdAt.substring(0, 10)}
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

export default MyShops;
