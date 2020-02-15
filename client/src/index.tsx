import { h, render, FunctionalComponent } from 'preact'
import { Router } from 'preact-router'
import { useState, useEffect } from 'preact/hooks';

export interface ProcessEnv {
  [key: string]: string | undefined
}

declare const process: {
  env: ProcessEnv
}

const Home: FunctionalComponent = () => <h2>Home Page</h2>
const Page1: FunctionalComponent = () => <h2>Page 1</h2>
const Page2: FunctionalComponent = () => <h2>Page 2</h2>
const Error: FunctionalComponent = () => <h3>Error</h3>

const App = (): h.JSX.Element => {
  const [serverResponse, setValue] = useState('');

  useEffect(() => {
    // Update the document title using the browser API
    const url = `http://${process.env['BACKEND_URL']}:${process.env['BACKEND_PORT']}`
    fetch(url)
      .then(response => response.json())
      .then(res => {
        console.log("Res: ", res)
        setValue(res.response)
      })
  }, []);

  return (
    <div>
      <h1>
        Hello from Preact and Typescript!
      </h1>
      <div>
        Data from node server: {serverResponse}
      </div>

      <Router>
        <Home path='/' />
        <Page1 path='page1' />
        <Page2 path='page2' />
        <Error default />
      </Router>
    </div>
  )
}

render(<App />, document.getElementById('root'))
