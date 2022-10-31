import './App.css';
import 'antd/dist/antd.css';

import {HashRouter, Link, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {UsersPage} from "./components/Users/UsersPage";
import {LoginPage} from "./components/Login/LoginPage";

import {UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, MenuProps} from 'antd';

import React, {Component} from "react";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import {AppHeader} from "./components/Header/AppHeader";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
const ChatPage = React.lazy(() => import("./pages/Chat/ChatPage"))

const SuspendedDialog = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPage)

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const createLink = (url: string, name: string) => {
    return (
        <Link to={url}>{name}</Link>
    )
}

export const menuItems: MenuProps['items'] = [
    {
        label: 'My profile',
        key: 'profile',
        icon: <UserOutlined/>,
        children: [
            {
                key: 'setting:1',
                label: (createLink("/profile", "Profile")),
            },
            {
                key: 'setting:2',
                label: (createLink("/dialogs", "Messages")),
            },
        ],
    },
    {
        label: 'Developers',
        key: 'developers',
        icon: <UserOutlined/>,
        children: [
            {
                key: 'setting:3',
                label: (createLink("/developers", "Developers")),
            },
        ],
    },
    {
        label: (createLink("/chat", "Chat")),
        key: 'chat',
        icon: <UserOutlined/>,
    },
    {
        label: (createLink("/news", "News")),
        key: 'news',
        icon: <UserOutlined/>,
        disabled: true
    },
    {
        label: (createLink("/music", "music")),
        key: 'music',
        icon: <UserOutlined/>,
        disabled: true
    },
    {
        label: (createLink("/settings", "Settings")),
        key: 'settings',
        icon: <UserOutlined/>,
        disabled: true
    },
];

class App extends Component<MapPropsType & DispatchPropsType> {

    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        alert("Some error occurred");
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        const {Content, Footer, Sider} = Layout;

        return (

            <Layout>
                <AppHeader/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                                items={menuItems}
                            />
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Switch>
                                <Route exact path='/'
                                       render={() => <Redirect to={"/profile"}/>}/>
                                <Route path='/dialogs' render={() => <SuspendedDialog/>}/>
                                <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
                                <Route path='/developers' render={() => <UsersPage pageTitle={"Самураи"}/>}/>
                                <Route path='/login' render={() => <LoginPage/>}/>
                                <Route path='/chat' render={() => <SuspendedChatPage/>}/>
                                <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Social Network ©2022 Created by me</Footer>
            </Layout>

            /*<div className='app-wrapper'>
                <HeaderContainer/>
                <NavbarContainer/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/'
                               render={() => <Redirect to={"/profile"}/>}/>
                        <Route path='/dialogs' render={() => <SuspendedDialog/>}/>
                        <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
                        <Route path='/developers' render={() => <UsersPage pageTitle={"Самураи"}/>}/>
                        <Route path='/login' render={() => <LoginPage/>}/>
                        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>

            </div>*/
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
});

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);

const SamuraiJSApp: React.FC = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SamuraiJSApp;