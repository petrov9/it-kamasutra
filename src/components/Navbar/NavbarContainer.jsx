import Navbar from "./Navbar";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        sidebarPage: state.sidebarPage
    };
}

const NavbarContainer = connect(mapStateToProps, {})(Navbar);

export default NavbarContainer;