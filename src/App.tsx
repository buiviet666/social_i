
import { RouterProvider } from 'react-router-dom'
import RoutesList from './Routes/index'
import { UserAuthProvider } from './context/UserAuthContext';

function App() {

  return (
    <UserAuthProvider>
      <RouterProvider router={RoutesList} />
    </UserAuthProvider>
  )
}

export default App;
