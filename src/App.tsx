
import { RouterProvider } from 'react-router-dom'
import RoutesList from './Routes/index'

function App() {

  return (
    <>
      <RouterProvider router={RoutesList} />
    </>
  )
}

export default App;
