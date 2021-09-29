import Navbar from "./Navbar";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        sidebarPage: state.sidebarPage
    };
}

let mapDispatchToProps = (dispatch) => {
    return {};
}

const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarContainer;