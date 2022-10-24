import * as React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}
type MapPropsType = {
    isAuth: boolean
}

type DispatchPropsType = {
}

export function withAuthRedirect<WCP extends JSX.IntrinsicAttributes> (WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {

        let {isAuth, ...restProps} = props;

        if (!isAuth) return <Redirect to={"/login"}/>

        return <WrappedComponent {...restProps as WCP}/>
    }

    let ConnectedRedirectComponent = connect<MapPropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect, {})
    (RedirectComponent);

    return ConnectedRedirectComponent;
}