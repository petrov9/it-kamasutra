import {Link} from "react-router-dom";
import React from "react";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {menuItems} from '../../App';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selectors";

type PropsType = {}

export const AppHeader: React.FC<PropsType> = (props) => {

    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectCurrentUserLogin);

    const dispatch = useDispatch();

    const logoutCallback = () => {
        dispatch(logout())
    }

    const {Header} = Layout;

    return (
        <Header className="header">
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={menuItems}/>
                </Col>
                {
                    isAuth ?
                        <>
                            <Col span={1}>
                                <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                            </Col>
                            <Col span={5} color={"white"}>
                                {login} - <Button onClick={logoutCallback}>Logout</Button>
                            </Col>
                        </>
                        : <Col span={6}>
                            <Button>
                                <Link to={'/Login'}>Login</Link>
                            </Button>

                        </Col>
                }
            </Row>


        </Header>
    )
}
