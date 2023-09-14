import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  recipeCreateReducer,
  recipeDeleteReducer,
  recipeListReducer,
  recipeUpdateReducer,
} from "./reducers/recipesReducers";
import {
  diaryCreateReducer,
  diaryDeleteReducer,
  diaryListReducer,
  diaryUpdateReducer,
} from "./reducers/diaryReducers";
import {
  shopCreateReducer,
  shopDeleteReducer,
  shopListReducer,
  shopUpdateReducer,
} from "./reducers/shopsReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  groceryCreateReducer,
  groceryDeleteReducer,
  groceryListReducer,
  groceryUpdateReducer,
} from "./reducers/groceriesReducers";
import {
  questionCreateReducer,
  questionDeleteReducer,
  questionListReducer,
  questionUpdateReducer,
} from "./reducers/questionsReducers";

const reducer = combineReducers({
  recipeList: recipeListReducer,
  diaryList: diaryListReducer,
  shopList: shopListReducer,
  groceryList: groceryListReducer,
  questionList: questionListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  recipeCreate: recipeCreateReducer,
  diaryCreate: diaryCreateReducer,
  groceryCreate: groceryCreateReducer,
  questionCreate: questionCreateReducer,
  shopCreate: shopCreateReducer,
  recipeDelete: recipeDeleteReducer,
  diaryDelete: diaryDeleteReducer,
  groceryDelete: groceryDeleteReducer,
  shopDelete: shopDeleteReducer,
  questionDelete: questionDeleteReducer,
  recipeUpdate: recipeUpdateReducer,
  diaryUpdate: diaryUpdateReducer,
  shopUpdate: shopUpdateReducer,
  userUpdate: userUpdateReducer,
  groceryUpdate: groceryUpdateReducer,
  questionUpdate: questionUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
