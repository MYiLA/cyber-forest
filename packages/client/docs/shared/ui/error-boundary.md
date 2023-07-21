# Как использовать компонент ErrorBoundary

## Компонент для демонстрации:
```tsx
const ErrorComponent = () => {
  throw new Error('Что-то сложное и непонятное')
  return <>Сюда код не дойдет</>
}
```

### 1-й вариант: Без передачи компонента
```tsx
import { ErrorBoundary } from '@ui/error-boundary'
import { ErrorComponent } from 'error-component'

const App = () => {
  return (
    <ErrorBoundary>
      <ErrorComponent/>
    </ErrorBoundary>
  )
}

```

Вывод: в этом случае отобразится элемент по-умолчанию ```<h3>Sorry.. there was an error</h3>```

### 2-й вариант: C передачей ReactNode компонента
```tsx
import { ErrorBoundary } from '@ui/error-boundary'
import { ErrorComponent } from 'error-component'

const CustomDisplayedError = () => {
  return <h5>Ой, тут какая-то ошибка</h5>
}

const App = () => {
  return (
    <ErrorBoundary errorElement={<CustomDisplayedError/>}>
      <ErrorComponent/>
    </ErrorBoundary>
  )
}

```

Вывод: в этом случае отобразится элемент ```<h5>Ой, тут какая-то ошибка</h5>```

### 3-й вариант: C передачей функционального компонента (принимает пропс ошибки - Error)

```tsx
import { ErrorBoundary } from '@ui/error-boundary'
import { ErrorComponent } from 'error-component'
import { types } from 'sass'
import Error = types.Error
import { Simulate } from 'react-dom/test-utils'
import error = Simulate.error

type ErrorProps = {
  error: Error
}
const CustomDisplayedError = ({ error }: ErrorProps) => {
  return <h5>Жесткая ошибка: {error.message}</h5>
}

const App = () => {
  return (
    <ErrorBoundary errorElement={CustomDisplayedError}>
      <ErrorComponent />
    </ErrorBoundary>
  )
}

```

Вывод: в этом случае отобразится элемент с текстом ошибки ```<h5>Жесткая ошибка: Что-то сложное и непонятное</h5>```
