import * as React from "react";
import { IStore } from "../../redux/store";
import AppBody from "../../components/AppBody/AppBody";
import UsersTable from "../../components/UsersTable/UsersTable";
import Pager from "../../components/Pager/Pager";
import { connect } from "react-redux";
import { loadUsers } from "../../redux/users/actions";
import { RouteComponentProps } from "react-router";
import { IUser } from "../../models/user";
import { ITableColumn } from "../../models/interfaces";
import UserDialog from "../../components/UserDialog/UserDialog";
import { getFormattedDateTimeString } from '../../helpers/dateTimeHelper';
import "./UserListPage.scss";

interface IUserListPageState {
    showAddUserDialog?: boolean;
}

interface OwnProps {
    users: IUser[];
    buttonsCount: number;
}

const mapStateToProps = (state: IStore, props: UserListPageProps) => {
    return {
        users: state.users.users,
        usersCount: state.users.usersCount
    };
};

const dispatchToProps = {
    loadUsers: loadUsers,
};

type UserListPageProps = RouteComponentProps<{ pageNumber: number }> & OwnProps & typeof dispatchToProps;

class UserListPage extends React.Component<UserListPageProps, IUserListPageState> {
    private _columns: ITableColumn[] = [
        { name: "ID", dataField: "user_id" },
        { name: "Name", dataField: "user_name" },
        { name: "Custom", dataField: "user_custom" },
        { name: "Email", dataField: "email" },
        { name: "Register Date", dataField: "register_date", formatter: value => getFormattedDateTimeString(new Date(value)) },
        { name: "Balance", dataField: "balance" },
        { name: "Amount", dataField: "wallet_amount" },
        { name: "Currency", dataField: "wallet_currency" },
    ];

    constructor(props?, context?) {
        super(props, context);
        let { match: { params: { pageNumber } } } = props;
        props.loadUsers(pageNumber);
        this.state = this.getInitialState();
    }

    private getInitialState(): IUserListPageState {
        return {
            showAddUserDialog: false,
        };
    }

    private _onCloseDialog = () => {
        this.setState({
            showAddUserDialog: false,
        });
    }

    componentWillReceiveProps(nextProps) {
        let { match: { params: { pageNumber } } } = nextProps;
        const { match: { params: { pageNumber: oldPageNumber } } } = this.props;
        if (oldPageNumber !== pageNumber)
            nextProps.loadUsers(pageNumber);
    }

    render() {
        const { users, usersCount, match: { params: { pageNumber = 1 } } } = this.props;
        const { showAddUserDialog } = this.state;
        let page = Number(pageNumber);
        if (isNaN(page)) {
            page = 1;
        }
        const limit = 10;
        const pagesCount = Math.ceil(usersCount / limit);

        return (
            <AppBody
                className="user-list-page"
                title="Users Management"
                showHomeLink={false}
            >
                {
                    showAddUserDialog &&
                    <UserDialog
                        title="Create user"
                        show={showAddUserDialog}
                        onAccept={this._onCloseDialog}
                        onClose={this._onCloseDialog}
                    />
                }
                <div className="user-list-page__main-container">
                    <div className="user-list-page__button-container">
                        <button
                            className="btn btn-primary user-list-page__add-user-button"
                            onClick={this._onAddUserHandler}
                        >
                            <span className="user-list-page__addUser-ico glyphicon glyphicon-plus" />
                            <span>Add user</span>
                        </button>
                    </div>
                    <div className="user-list-page__users-table-container">
                        <UsersTable
                            users={users}
                            columns={this._columns}
                        />
                    </div>
                    <div className="user-list-page__pager-container">
                        <Pager
                            count={pagesCount}
                            page={page}
                            buttonsCount={5}
                        >
                        </Pager>
                    </div>
                </div>
            </AppBody>
        );
    }

    private _onAddUserHandler = () => {
        this.setState({
            showAddUserDialog: true,
        });
    }
}

export default connect(mapStateToProps, dispatchToProps)(UserListPage);