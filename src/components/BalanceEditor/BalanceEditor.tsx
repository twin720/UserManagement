import * as React from "react";
import * as cn from "classnames";
import { connect } from 'react-redux';
import { changeBalance } from "../../redux/user/actions";
import { IUser } from "../../models/user";
import { IStore } from "../../redux/store";
import "./BalanceEditor.scss";

interface OwnProps {
	user: IUser;
}

interface IBalanceEditorState {
	inputAmountValue: string,
	inputCommentValue: string,
	amountError: string,
	commentError: string,
	showSuccess: boolean,

}

const mapStateToProps = (state: IStore, props: BalanceEditorProps) => {
	return {
	};
};

const dispatchToProps = {
	changeBalance: changeBalance,
};

type BalanceEditorProps = typeof dispatchToProps & OwnProps;

class BalanceEditor extends React.Component<BalanceEditorProps, IBalanceEditorState> {
	private _inputAmount;
	private _inputComment;
	private _timer;

	constructor(props?, context?) {
		super(props, context);
		this.state = this.getInitialState(props);
	}

	private getInitialState(props): IBalanceEditorState {
		return {
			inputAmountValue: "",
			inputCommentValue: "",
			amountError: "",
			commentError: "",
			showSuccess: false
		};
	}
	render() {
		const { amountError, inputAmountValue, commentError, inputCommentValue, showSuccess } = this.state;
		const { user } = this.props;
		if (showSuccess) {
			if (this._timer) {
				window.clearTimeout(this._timer);
			}
			this._timer = window.setTimeout(
				() => {
					this.setState({ showSuccess: false });
				}
				, 2000);
		}
		return (
			<div className="balance-editor">
				<div className="col-sm-12 balance-editor__current">
					<label className="balance-editor__current-label">Current balance:</label>
					<span className="balance-editor__current-value">
						{user.balance}
					</span>
				</div>
				<div className="balance-editor__form form-horizontal">
					<div className="form-group">
						<label className="col-sm-2 control-label">Amount</label>
						<div className="col-sm-8">
							<input type="number" placeholder="Amount"
								className={cn("form-control", { "errorField": !!amountError })}
								value={inputAmountValue}
								ref={input => this._inputAmount = input}
								onChange={this._onAmountChange}
							/>
							{
								amountError &&
								<span className="errorField">{amountError}</span>
							}
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">Comment</label>
						<div className="col-sm-8">
							<input type="text" placeholder="Comment"
								className={cn("form-control", { "errorField": !!commentError })}
								value={inputCommentValue}
								ref={input => this._inputComment = input}
								onChange={this._onCommentChange}
							/>
							{
								commentError &&
								<span className="errorField">{commentError}</span>
							}
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-8">
							<button
								className="btn btn-primary"
								onClick={this._onChangeClick}
							>
								Change
						</button>
						</div>
					</div>
					{
						showSuccess &&
						<div className="alert alert-success" role="alert">Done! Balance changed successfully.</div>
					}
				</div>
			</div>
		);
	}

	private _onChangeClick = () => {
		const { inputAmountValue, inputCommentValue } = this.state;
		const { changeBalance, user } = this.props;

		const amount = inputAmountValue.trim();
		let amountError = ""
		if (!amount)
			amountError = "Amount cannot be empty";
		else {
			if (isNaN(Number(amount)))
				amountError = "Amount is not a number";
		}

		const comment = inputCommentValue.trim();
		const commentError = !comment ? "Comment cannot be empty" : "";

		if (commentError || amountError) {
			this.setState({
				commentError,
				amountError
			});
			return;
		}
		(changeBalance(user.user_id, Number(amount), comment) as any).then((amount: number) => {
			if (!isNaN(Number(amount))) {
				this.setState({
					showSuccess: true,
				});
			}
		});
	}

	private _onAmountChange = () => {
		this.setState({
			inputAmountValue: this._inputAmount.value,
			amountError: "",
			showSuccess: false,
		});
	}

	private _onCommentChange = () => {
		this.setState({
			inputCommentValue: this._inputComment.value,
			commentError: "",
			showSuccess: false,
		});
	}
}

export default connect(mapStateToProps, dispatchToProps)(BalanceEditor);