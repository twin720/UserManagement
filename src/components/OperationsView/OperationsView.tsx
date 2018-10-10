import * as React from "react";
import OperationsTable from "../OperationsTable/OperationsTable";
import { IOperation } from "../../models/operation";
import { ITableColumn } from "../../models/interfaces";
import { connect } from "react-redux";
import { getOperations } from "../../redux/user/actions";
import { RouteComponentProps } from "react-router";
import { IStore } from "../../redux/store";
import DatePicker from "react-datepicker";
import * as moment from "moment";
import { getFormattedDateTimeString } from '../../helpers/dateTimeHelper';
import 'react-datepicker/dist/react-datepicker.css';
import "./OperationsView.scss";
import { getLocale } from '../../localization';

interface IOperationsViewState {
	inputFromMoment?: moment.Moment;
	inputToMoment?: moment.Moment;
}

interface OwnProps {
	operations: IOperation[];
	userId: string;
}

const mapStateToProps = (state: IStore, props: OperationsViewProps) => {
	return {
		operations: state.user.operations,
	};
};

const dispatchToProps = {
	getOperations: getOperations,
};

type OperationsViewProps = RouteComponentProps<{ userId: string }> & OwnProps & typeof dispatchToProps;

class OperationsView extends React.Component<OperationsViewProps, IOperationsViewState> {
	private _datePickerFrom;
	private _datePickerTo;

	private _columns: ITableColumn[] = [
		{ name: "ID", dataField: "operation_id" },
		{ name: "Type", dataField: "transaction_type" },
		{ name: "Comment", dataField: "comment" },
		{ name: "Date", dataField: "date", formatter: value => getFormattedDateTimeString(new Date(value)) },
		{ name: "Amount", dataField: "amount" },
		{ name: "Balance", dataField: "user_balance" },
		{ name: "Status", dataField: "status" },
	];

	constructor(props?, context?) {
		super(props, context);
		props.getOperations(props.userId);
		this.state = this.getInitialState();
	}

	private getInitialState(): IOperationsViewState {
		return {
			inputFromMoment: null,
			inputToMoment: null,
		};
	}

	render() {
		return (
			<div className="operations-view">
				<div className="operations-view__controls">
					<div className="operations-view__date-group">
						<label className="operations-view__date-label">From:</label>
						<DatePicker
							className="operations-view__date-picker"
							placeholderText="Select a date" 
							selected={this.state.inputFromMoment}
							onChange={this._onInputFromMomentChange}
							locale={getLocale()}
							ref={input => this._datePickerFrom = input}
						/>
					</div>
					<div className="operations-view__date-group">
						<label className="operations-view__date-label">To:</label>
						<DatePicker
							className="operations-view__date-picker"
							placeholderText="Select a date" 
							selected={this.state.inputToMoment}
							onChange={this._onInputToMomentChange}
							locale={getLocale()}
							ref={input => this._datePickerTo = input}
						/>
					</div>
				</div>
				<OperationsTable
					columns={this._columns}
					rows={this.props.operations}
				/>
			</div>
		);
	}

	private _onInputFromMomentChange = (value: moment.Moment) => {
		const { userId } = this.props;
		const fromValue = value;
		const toValue = this.state.inputToMoment;
		this.setState({
			inputFromMoment: value,
		});
		this._getOperations(userId, fromValue, toValue);
	}

	private _onInputToMomentChange = (value: moment.Moment) => {
		const { userId } = this.props;
		const toValue = value;
		const fromValue = this.state.inputFromMoment;
		this.setState({
			inputToMoment: value,
		});
		this._getOperations(userId, fromValue, toValue);
	}

	private _getOperations = (userId: string, fromValue: moment.Moment, toValue: moment.Moment) => {
		if (fromValue && toValue) {
			const toNoMs = mom => `${mom.toISOString(true).split("T")[0]}T00:00:00Z`;
			this.props.getOperations(userId, toNoMs(fromValue), toNoMs(toValue));
		}
	}
}

export default connect(mapStateToProps, dispatchToProps)(OperationsView);