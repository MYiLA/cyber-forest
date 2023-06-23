import { ChangeEvent, useCallback, useEffect, useState } from 'react'

export type TValidatorItem = {
  required?: boolean
  rule?: RegExp | string | boolean | null
  message: string
  error?: string | null
}
export type TValidators = Record<string, TValidatorItem>
export type TFields = Record<string, string | boolean | null>

export const useForm = (
  initialFields: TFields,
  validators: TValidators = {}
) => {
  const [form, setForm] = useState(initialFields)
  const [modified, setModified] = useState(false)
  const [validate, setValidate] = useState(validators)

  useEffect(() => {
    setModified(JSON.stringify(form) !== JSON.stringify(initialFields))
  }, [form, initialFields])

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'checkbox') {
      const { name, checked } = e.target
      setForm(prev => ({ ...prev, [name]: checked }))
    } else {
      const { name, value } = e.target
      setForm(prev => ({ ...prev, [name]: value }))
      clearError(name)
    }
  }, [])

  const resetForm = useCallback(() => {
    setForm(initialFields)
    setValidate(validators)
  }, [initialFields, validators])

  const onFocus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (value === '' && validate[name].error === null) {
      setValidate(prev => ({
        ...prev,
        [name]: { ...prev[name], error: '' },
      }))
    }
  }, [])

  const onBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    toValidate(name, value)
  }, [])

  const toValidate = useCallback((name: string, value: string) => {
    const error = validateField(name, value) as string | null
    setValidate(prev => ({
      ...prev,
      [name]: { ...prev[name], error },
    }))
    return error
  }, [])

  const validateField = useCallback(
    (field: string, value: string): string | null => {
      // no validators
      if (!validators[field]) {
        return null
      }

      // required without validators
      if (
        !validators[field].rule &&
        validators[field].required &&
        value !== ''
      ) {
        return null
      }

      // compare with another field
      if (
        typeof validators[field].rule === 'string' &&
        (validators[field].rule as string).match(/confirm:\S/)
      ) {
        const neededField = (validators[field].rule as string).split(
          ':'
        )[1] as string

        return value === form[neededField] ? null : validators[field].message
      }

      // validate boolean field
      if (typeof validators[field].rule === 'boolean') {
        return value ? null : validators[field].message
      }

      // validator RegExp
      if (
        typeof validators[field].rule === 'object' &&
        !value.match(validators[field].rule as RegExp)
      ) {
        return validators[field].message
      } else {
        return null
      }
    },
    [validators]
  )

  const clearError = useCallback((name: string) => {
    setValidate(prev => ({
      ...prev,
      [name]: { ...prev[name], error: '' },
    }))
  }, [])

  const validateAllFields = useCallback((): boolean => {
    let result = true
    Object.keys(validators).forEach(name => {
      if (toValidate(name, form[name] as string) !== null) {
        result = false
      }
    })
    return result
  }, [validators, form])

  return {
    form,
    setForm,
    onChange,
    resetForm,
    modified,
    validate,
    onFocus,
    onBlur,
    validateAllFields,
  }
}
