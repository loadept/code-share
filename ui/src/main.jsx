import { render } from 'preact'
import './index.css'
import Home from './pages/home'

const App = () => {
  return (
    <Home />
  )
}
render(<App />, document.getElementById('app'))
