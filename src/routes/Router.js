import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../layout/Main"
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import AddFood from "../Pages/AddFood";
import ViewFoods from "../components/ViewFoods";
import ViewFood from "../components/ViewFood";
import ViewCart from "../Pages/ViewCart";
const router = createBrowserRouter([
  {
    path: '/', element: <Main></Main>,
    children: [
      {
        path: '/', element: <Home></Home>
      },
      {
        path: '/add-food', element: <AddFood></AddFood>
      },
      {
        path: 'foods/:category', element: <ViewFoods></ViewFoods>,
        loader: ({params}) => fetch(`http://localhost:5000/foods?category=${params.category}`)
      },
      {
        path: 'food/:id', element: <ViewFood></ViewFood>,
        loader: ({params}) => fetch(`http://localhost:5000/food?id=${params.id}`)
      },
      {
        path: '/view-cart', element: <ViewCart></ViewCart>
      },
      {
        path: '/login', element: <Login></Login>
      },
      {
        path: '/sign-up', element: <SignUp></SignUp>
      },
    ]
  }
])

export default router;
