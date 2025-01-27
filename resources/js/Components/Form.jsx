import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit() {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
  })

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value
    setValues(values => ({
        ...values,
        [key]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    router.post('/users', values)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="first_name">First name:</label>
      <input id="first_name" value={values.first_name} onChange={handleChange} />
      <label htmlFor="last_name">Last name:</label>
      <input id="last_name" value={values.last_name} onChange={handleChange} />
      <label htmlFor="email">Email:</label>
      <input id="email" value={values.email} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  )
}
