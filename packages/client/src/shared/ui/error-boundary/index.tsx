import { Component, ErrorInfo, FC, ReactNode } from 'react'

type ErrorFC = FC<{ error: Error }>

const isErrorComponent = (component: unknown): component is ErrorFC => {
  return typeof component === 'function'
}

interface Props {
  children: ReactNode
  errorElement?: ReactNode | ErrorFC
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      // Если не передан компонент ошибки
      if (!this.props.errorElement || !this.state.error) {
        return <h3>Sorry.. there was an error</h3>
      }
      // Если компонент ошибки - функция
      if (isErrorComponent(this.props.errorElement)) {
        const ErrorComponent = this.props.errorElement
        return <ErrorComponent error={this.state.error} />
      }
      // Если компонент ошибки - ReactNode
      return this.props.errorElement
    }

    return this.props.children
  }
}
