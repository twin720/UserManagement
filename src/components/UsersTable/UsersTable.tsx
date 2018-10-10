import * as React from "react";
import { render } from "react-dom";
import * as cn from "classnames";
import { IUser } from "../../models/user";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
//import ReactTable from "react-table";
//import "react-table/react-table.css";
import { spaUrls } from "../../helpers/urlHelper";
import { ITableColumn } from "../../models/interfaces";
import { Redirect } from "react-router-dom";
import "./UsersTable.scss";

interface IUsersTableState {
    redirectToUser: string;
}

interface IUsersTableProps {
    users: IUser[];
    columns: ITableColumn[];
}

export default class UsersTable extends React.Component<IUsersTableProps, IUsersTableState> {

    constructor(props?, context?) {
		super(props, context);
		this.state = {
			redirectToUser: ""
		};
	}

    render() {
        const { users, columns } = this.props;

        if (this.state.redirectToUser) {
            return <Redirect push to={spaUrls.user(this.state.redirectToUser)} />;
        }

        return users && users.length > 0 && (
            <table className="users-table table table-striped table-bordered table-condensed table-hover">
                <thead>
                    <tr>
                        {columns.map(x =>
                            <th
                                className="users-table__header-cell"
                                key={`th_${x.dataField}`}
                            >
                                {x.name}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {users.map(x => this._renderRow(x))}
                </tbody>
            </table>
        );
    }

    //<Link to={spaUrls.user(user.user_id)}>

    private _renderRow = (user: IUser) => {
        const { columns } = this.props;
        const id = user.user_id;
        return (
            <tr
                className="users-table__row"
                key={id}
                onClick={this._onRowClickHandler(id)}
            >
                {columns.map(x => {
                    let str = user[x.dataField];
                    if (x.formatter)
                        str = x.formatter(str);
                    return (
                        <td
                            className="users-table__cell"
                            key={`${id}_${x.dataField}`}
                        >
                            <span>{str}</span>
                        </td>
                    );
                })}
            </tr>
        );
    }

    private _onRowClickHandler = (userId: string) => () => {
        this.setState({ redirectToUser: userId });
    }
}
