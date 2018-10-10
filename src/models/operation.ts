export interface IOperation {
	operation_id: number,
	transaction_id?: number,
	coupon_id?: number,
	coupon_code?: number,
	transaction_type?: string,
	comment?: string,
	date: string,
	amount: number,
	user_balance: number,
	sum?: number,
	currency?: string,
	user_id: string,
	status: string
}
