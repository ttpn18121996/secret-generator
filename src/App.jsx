import { useEffect, useRef, useState } from 'react'
import { _str } from '@noravel/supporter'
import './App.css'

function App() {
  const [length, setLength] = useState(32)
  const [numbers, setNumbers] = useState(true)
  const [uppercase, setUppercase] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [result, setResult] = useState('')
  const alertRef = useRef(null)

  useEffect(() => {
    generateSecret()
  }, [])

  function generateSecret() {
    const secret = _str().random(length, { uppercase, numbers, symbols }).toString()
    setResult(secret)
  }

  function copySecret() {
    navigator.clipboard.writeText(result).then(() => {
      alertRef.current.classList.remove('hidden')
      setTimeout(() => {
        alertRef.current.classList.add('hidden')
      }, 3000)
    })
  }

  return (
    <>
      <h1 className="heading">Secret Generator</h1>
      <div className="options">
        <div className="option">
          <input type="text" id="length" value={length} onChange={(e) => setLength(e.target.value)} />
        </div>

        <div className="option">
          <input type="checkbox" id="numbers" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} />
          <label htmlFor="numbers">Numbers</label>
        </div>

        <div className="option">
          <input type="checkbox" id="uppercase" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
          <label htmlFor="uppercase">Uppercase</label>
        </div>

        <div className="option">
          <input type="checkbox" id="symbols" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />
          <label htmlFor="symbols">Symbols</label>
        </div>
      </div>
      <div className="controls">
        <button onClick={generateSecret}>Generate</button>
        <button onClick={copySecret}>Copy</button>
      </div>
      <div id="result">{result}</div>

      <div className="alert hidden" ref={alertRef}>Copied</div>
    </>
  )
}

export default App
