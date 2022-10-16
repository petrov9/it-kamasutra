import ReactDOM from "react-dom";
import SamuraiJSApp from "./App";

it('renders without crashing', () => {
  let div = document.createElement("div");
  ReactDOM.render(<SamuraiJSApp/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
