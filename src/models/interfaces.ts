export interface ITableColumn {
	dataField: string;
	name: string;
	formatter?: (value: any) => string;
}