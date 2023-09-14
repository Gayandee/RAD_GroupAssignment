import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyRecipes from "./screens/MyRecipes/MyRecipes";
import MyDiaries from "./screens/MyDiaries/MyDiaries";
import MyShops from "./screens/MyShops/MyShops";
import MyGroceries from "./screens/MyGroceries/MyGroceries";
import MyQuestions from "./screens/MyQuestions/MyQuestions";
import SingleQuestion from "./screens/SingleQuestion/SingleQuestion";
import SingleRecipe from "./screens/SingleRecipe/SingleRecipe";
import SingleDiary from "./screens/SingleDiary/SingleDiary";
import SingleShop from "./screens/SingleShop/SingleShop";
import SingleGrocery from "./screens/SingleGrocery/SingleGrocery";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateRecipe from "./screens/SingleRecipe/CreateRecipe";
import CreateDiary from "./screens/SingleDiary/CreateDiary";
import CreateShop from "./screens/SingleShop/CreateShop";
import CreateGrocery from "./screens/SingleGrocery/CreateGrocery";
import CreateQuestion from "./screens/SingleQuestion/CreateQuestion";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route
          path="/myrecipes"
          component={({ history }) => (
            <MyRecipes search={search} history={history} />
          )}
        />
        <Route
          path="/mydiaries"
          component={({ history }) => (
            <MyDiaries search={search} history={history} />
          )}
        />
        <Route
          path="/myshops"
          component={({ history }) => (
            <MyShops search={search} history={history} />
          )}
        />
        <Route
          path="/mygroceries"
          component={({ history }) => (
            <MyGroceries search={search} history={history} />
          )}
        />
        <Route
          path="/myquestions"
          component={({ history }) => (
            <MyQuestions search={search} history={history} />
          )}
        />
        <Route path="/question/:id" component={SingleQuestion} />
        <Route path="/recipe/:id" component={SingleRecipe} />
        <Route path="/diary/:id" component={SingleDiary} />
        <Route path="/shop/:id" component={SingleShop} />
        <Route path="/grocery/:id" component={SingleGrocery} />
        <Route path="/creategrocery" component={CreateGrocery} />
        <Route path="/createrecipe" component={CreateRecipe} />
        <Route path="/creatediary" component={CreateDiary} />
        <Route path="/createshop" component={CreateShop} />
        <Route path="/createquestion" component={CreateQuestion} />
        <Route path="/profile" component={ProfileScreen} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
