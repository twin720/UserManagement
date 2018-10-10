import * as React from "react";
import { IUser } from "../../models/user";
import UserDialog from "../UserDialog/UserDialog";
import { ITableColumn } from "../../models/interfaces";
import "./UserInformation.scss";

export interface IUserInformationState {
	showDialog: boolean;
}

export interface IUserInformationProps {
	user: IUser;
}

export default class UserInformation extends React.Component<IUserInformationProps, IUserInformationState> {

	constructor(props?, context?) {
		super(props, context);
		this.state = this.getInitialState();
	}

	private getInitialState(): IUserInformationState {
		return {
			showDialog: false,
		};
	}

	private _onCloseDialog = () => {
		this.setState({
			showDialog: false,
		});
	}

	private _fields: ITableColumn[] = [
		{ name: "ID:", dataField: "user_id" },
		{ name: "Name:", dataField: "user_name" },
		{ name: "Custom:", dataField: "user_custom" },
		{ name: "Email:", dataField: "email" },
		{ name: "Register Date:", dataField: "register_date" },
		{ name: "Balance:", dataField: "balance" },
		{ name: "Amount:", dataField: "wallet_amount" },
		{ name: "Currency:", dataField: "wallet_currency" },
		{ name: "Enabled:", dataField: "enabled", formatter: (x) => x ? "True" : "False" },
	];

	render() {
		const { user } = this.props;
		const { showDialog } = this.state;
		return (
			<div className="user-information">
				{
					showDialog &&
					<UserDialog
						user={{ ...user }}
						title="Update user"
						show={showDialog}
						onAccept={this._onCloseDialog}
						onClose={this._onCloseDialog}
					/>
				}
				<table>
					<tbody>
						{this._renderFields()}
						<tr>
							<td>
							</td>
							<td>
								<button
									className="btn btn-primary user-information__button"
									onClick={this._onEditClickHandler}
								>
									Edit
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	private _renderFields = () => {
		return this._fields.map((x: ITableColumn) => {
			let val = this.props.user[x.dataField];
			if (x.formatter)
				val = x.formatter(val);
			return <tr key={x.dataField}>
				<td className="user-information__key-cell">
					<label className="user-information__label">{x.name}</label>
				</td>
				<td>
					<span>{val}</span>
				</td>
			</tr>;
		});
	}

	private _onEditClickHandler = () => {
		this.setState({
			showDialog: true,
		});
	}
}