import { Component, ErrorInfo, FC, ReactNode } from "react";

type ErrorFC = FC<{ error: Error }>;

const isErrorComponent = (component: unknown): component is ErrorFC =>
  typeof component === "function";

interface Props {
  children: ReactNode;
  errorElement?: ReactNode | ErrorFC;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    const { state, props } = this;
    if (state.hasError) {
      // Если не передан компонент ошибки
      if (!props.errorElement || !state.error) {
        return <h3>Sorry.. there was an error</h3>;
      }
      // Если компонент ошибки - функция
      if (isErrorComponent(props.errorElement)) {
        const ErrorComponent = props.errorElement;
        return <ErrorComponent error={state.error} />;
      }
      // Если компонент ошибки - ReactNode
      return props.errorElement;
    }

    return props.children;
  }
}
