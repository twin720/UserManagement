import * as React from "react";
import { IOperation } from "../../models/operation";
import { ITableColumn } from "../../models/interfaces";
import "./OperationsTable.scss";

export interface IOperationsTableProps {
	rows: IOperation[];
	columns: ITableColumn[];
}

export default class OperationsTable extends React.Component<IOperationsTableProps, {}> {
	render() {
		const { rows, columns } = this.props;
		return rows && rows.length > 0 && (
			<table className="operations-table table table-striped table-bordered table-condensed table-hover">
				<thead>
					<tr>
						{columns.map(x =>
							<th
								className="operations-table__header-cell"
								key={`th_${x.dataField}`}
							>
								{x.name}
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{rows.map(x => this._renderRow(x))}
				</tbody>
			</table>
		);
	}

	private _renderRow = (row: IOperation) => {
		const { columns } = this.props;
		const id = row.operation_id;
		return (
			<tr
				key={id}
			>
				{columns.map(x => {
					let str = row[x.dataField];
					if (x.formatter)
						str = x.formatter(str);
					const inner = <span>{str}</span>
					return (
						<td
							className="operations-table__cell"
							key={`${id}_${x.dataField}`}
						>
							{inner}
						</td>
					);
				})}
			</tr>
		);
	}
}