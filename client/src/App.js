import "./App.scss";
import DashBoard from "./Components/DashBoard/DashBoard";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path:'/',
    element: <div><Login/></div>
  },
  {
    path:'/register',
    element: <div><Register/></div>
  },
  {
    path:'/dashboard',
    element: <div><DashBoard/></div>
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
