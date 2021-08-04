import * as React from "react"
import { Screens } from "../../navigation"
import FlashMessage, { showMessage } from "react-native-flash-message"
import { observer } from "mobx-react"

@observer
export default class ErrorBoundary extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidMount(): void {

  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.log(this.props)
    showMessage({
      message: error,
      type: "danger",
    });
  }

  gotoHomePage = () => {
    this.props.navigation?.navigate(Screens.home)
  }

  render() {
    return <>
      {this.props.children}
      <FlashMessage position="top" />
      </>;
  }
}

