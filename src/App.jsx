import { useState } from 'react'

export default function App() {
  const [status, setStatus] = useState('empty')
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState(null)

  const isEmpty = answer.trim().length === 0
  const isSubmitting = status === 'submitting'
  const isSuccess = status === 'success'

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setError(null)

    try {
      await fakeSubmit(answer)
      setStatus('success')
    } catch (err) {
      setError(err.message)
      setStatus('typing')
    }
  }

  function handleChange(e) {
    const next = e.target.value
    setAnswer(next)
    if (next.trim().length === 0) {
      setStatus('empty')
    } else if (status !== 'submitting' && status !== 'success') {
      setStatus('typing')
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>React 19 • Reacting to Input with State</h1>
        <p className="subtitle">
          Declarative UI: render what each <strong>state</strong> looks like—no manual DOM manipulation.
        </p>
      </header>

      {isSuccess ? (
        <SuccessPanel />
      ) : (
        <form className="card" onSubmit={handleSubmit}>
          <h2 className="card-title">Mini-Quiz</h2>
          <p className="muted">Question: What is React?</p>

          <textarea
            className="input"
            value={answer}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="Type your answer. Hint: mention 'React'…"
            aria-label="Your answer"
          />

          <div className="actions">
            <button className="btn" disabled={isEmpty || isSubmitting}>
              {isSubmitting ? 'Submitting…' : 'Submit'}
            </button>
            <ResetButton
              disabled={isSubmitting && !error}
              onReset={() => {
                setAnswer('')
                setError(null)
                setStatus('empty')
              }}
            />
          </div>

          {error && <p role="alert" className="error">{error}</p>}

          <VisualState status={status} isEmpty={isEmpty} />
        </form>
      )}

      <Footer />
    </div>
  )
}

function SuccessPanel() {
  return (
    <div className="card success">
      <h2 className="card-title">✅ That’s right!</h2>
      <p className="muted">You modeled your UI declaratively and handled state transitions. Nice!</p>
    </div>
  )
}

function ResetButton({ disabled, onReset }) {
  return (
    <button
      type="button"
      className="btn outline"
      onClick={onReset}
      disabled={disabled}
      aria-label="Reset the form"
    >
      Reset
    </button>
  )
}

function VisualState({ status, isEmpty }) {
  const label =
    status === 'submitting' ? 'submitting' :
    status === 'success' ? 'success' :
    isEmpty ? 'empty' : 'typing'

  return (
    <p className="state">
      Visual state: <code>{label}</code>
    </p>
  )
}

function fakeSubmit(text) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (text.toLowerCase().includes('react')) resolve()
      else reject(new Error('❌ Try again. Tip: Answer should include “React”.'))
    }, 900)
  })
}

function Footer() {
  return (
    <footer>
      React 19 + Vite sample • Lesson 18 — Reacting to Input with State
    </footer>
  )
}
