import { useState } from "react"

export default function Componente01() {
    const [state, setState] = useState(0)
    return (
        <>   
            <h1>{state}</h1>
            <button onClick={() => setState(state+1)}>Adiciona 1</button>
        </>
    )
  }