import { ChangeEvent, useEffect, useState } from 'react'

export const useForm = <T>(initialFields: T) => {
  const [form, setForm] = useState(initialFields)
  const [modified, setModified] = useState(false)

  useEffect(() => {
    setModified(JSON.stringify(form) !== JSON.stringify(initialFields))
  }, [form, initialFields])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm(initialFields)
  }

  return { form, setForm, onChange, resetForm, modified }
}
