import * as React from "react";
import * as cn from "classnames";
import { IUser } from "../../models/user";
import "./UserEditor.scss";

interface OwnProps {
	user: IUser;
}

interface IUserEditorState {
	inputIDValue: string,
	inputNameValue: string,
	inputCustomValue: string,
	inputEmailValue: string,
	idError: string,
	emailError: string;
}

type UserEditorProps = OwnProps;

export default class UserEditor extends React.Component<UserEditorProps, IUserEditorState> {
	render() {
		return (
			<form className="form-horizontal">
				<div className="form-group">
					<label className="col-sm-2 control-label">Name</label>
					<div className="col-sm-8">
						<input type="text" className="form-control" placeholder="Name" />
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-2 control-label">Custom</label>
					<div className="col-sm-8">
						<input type="text" className="form-control" placeholder="Custom" />
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-2 control-label">Email</label>
					<div className="col-sm-8">
						<input type="email" className="form-control" placeholder="Email" />
					</div>
				</div>
				<div className="form-group">
					<div className="col-sm-offset-2 col-sm-8">
						<div className="checkbox">
							<label>
								<input type="checkbox" className="" /><span>Enabled</span>
							</label>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-sm-offset-2 col-sm-8">
						<button type="submit" className="btn btn-primary">Save</button>
					</div>
				</div>
			</form>
		);
	}
}
