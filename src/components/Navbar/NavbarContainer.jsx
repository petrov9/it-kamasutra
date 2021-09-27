import StoreContext from "../../StoreContext";
import Navbar from "./Navbar";

const NavbarContainer = () => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();

                    return (
                        <Navbar sidebarPage={state.sidebarPage}/>
                    );
                }
            }
        </StoreContext.Consumer>
    );
}

export default NavbarContainer;