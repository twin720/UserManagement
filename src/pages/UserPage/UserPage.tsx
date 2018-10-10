import * as React from "react";
import { render } from "react-dom";
import * as cn from "classnames";
import AppBody from "../../components/AppBody/AppBody";
import { Link } from "react-router-dom";
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem
} from "react-bootstrap";
import "./UserPage.scss";
import UserInformation from "../../components/UserInformation/UserInformation";
import OperationsView from "../../components/OperationsView/OperationsView";
import UserEditor from "../../components/UserEditor/UserEditor";
import BalanceEditor from "../../components/BalanceEditor/BalanceEditor";
import { RouteComponentProps } from "react-router";
import NotfoundPage from "../NotfoundPage/NotfoundPage";
import { connect } from "react-redux";
import { IStore } from "../../redux/store";
import { getUser } from "../../redux/user/actions";
import { IUser } from "../../models/user";
import { ConnectedRouter } from "react-router-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import history from "../../redux/history";
import { spaPatterns, spaUrls } from "../../helpers/urlHelper";

interface OwnProps {
    user: IUser;
}

const mapStateToProps = (state: IStore, props: UserPageProps) => {
    return {
        user: state.user.user,
        loading: state.application.loading,
    };
};

const dispatchToProps = {
    getUser: getUser,
};

type UserPageProps = RouteComponentProps<{ userId: string }> & OwnProps & typeof dispatchToProps;

class UserPage extends React.Component<UserPageProps, {}> {

    constructor(props?, context?) {
        super(props, context);
        let { match: { params: { userId } } } = props;
        props.getUser(userId);
    }

    render() {
        const { match: { params: { userId } }, user, loading } = this.props;

        if (!loading && (!user || !user.user_id)) {
            return <NotfoundPage />;
        }

        return (
            <AppBody
                className="user-page"
                title="User Information"
                showHomeLink={true}
            >
                <div className="user-page__container container-fluid">
                    <div className="user-page__main-row row">
                        <div className="col-sm-3 user-page__list-group-container">
                            <div className="list-group user-page__list-group">
                                {this._getLink(userId, "user", "Information")}
                                {this._getLink(userId, "userOperations", "Operations")}
                                {/* {this._getLink(userId, "userEdit", "Edit user")} */}
                                {this._getLink(userId, "userBalance", "Change balance")}
                            </div>
                        </div>
                        <div className="user-page__content col-sm-9">
                            <ConnectedRouter history={history}>
                                <Switch>
                                    <Route path={spaPatterns.user()} exact={true}
                                        render={
                                            (props) => (
                                                <UserInformation user={user}
                                                //match={{ path: props.match.path, params: { moduleCode: module.code } }}
                                                />
                                            )
                                        }
                                    />
                                    <Route path={spaPatterns.userOperations()} exact={true}
                                        render={
                                            (props) => (
                                                <OperationsView
                                                    userId={user.user_id}
                                                //match={{ path: props.match.path, params: { moduleCode: module.code } }}
                                                />
                                            )
                                        }
                                    />
                                    {
                                        // <Route path={spaPatterns.userEdit()} exact={true}
                                        //     render={(props) => <UserEditor user={user} />}
                                        // />
                                    }
                                    <Route path={spaPatterns.userBalance()} exact={true}
                                        render={(props) => <BalanceEditor user={user} />}
                                    />
                                </Switch>
                            </ConnectedRouter>
                        </div>
                    </div>
                </div>
            </AppBody>
        );
    }

    private _getLink = (userId: string, funcName: string, text: string) => {
        return (
            <Link
                to={spaUrls[funcName](userId)}
                className={cn("list-group-item",
                    { "active": this.props.match.path === spaPatterns[funcName]() }
                )}
            >
                {text}
            </Link>
        );
    }
}

export default connect(mapStateToProps, dispatchToProps)(UserPage);