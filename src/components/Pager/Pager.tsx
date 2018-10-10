import * as React from "react";
import { render } from "react-dom";
import * as cn from "classnames";
import { Link } from 'react-router-dom';
import { spaUrls } from "../../helpers/urlHelper";
import "./Pager.scss";

export interface IPagerProps {
	page: number;
	count: number;
	buttonsCount?: number;
	className?: string;
}

interface IPagerState {
	buttonsCount: number;
}

export default class Pager extends React.Component<IPagerProps, IPagerState> {

	constructor(props?, context?) {
		super(props, context);
		const { buttonsCount } = props;
		this.state = {
			buttonsCount: buttonsCount != null ? buttonsCount : 3
		};
	}

	render() {
		const { className, page } = this.props;
		return (
			<ul className={cn("my-pager pagination", className)}>
				{this._renderArrowButton(false)}
				{this._renderNumbers()}
				{this._renderArrowButton(true)}
			</ul>
		);
	}

	private _renderArrowButton = (isForward: boolean) => {
		const { page, count } = this.props;
		const disabled = isForward && page >= count || !isForward && page <= 1;
		let inner = (
			<span className="page-link">
				{
					isForward ?
						<span>&raquo;</span>
						:
						<span>&laquo;</span>
				}
				<span className="sr-only">
					{isForward ? "Next" : "Previous"}
				</span>
			</span>
		);
		if (!disabled) {
			const newPage = page + (isForward ? 1 : -1);
			inner = (
				<Link to={spaUrls.users(newPage)} >
					{inner}
				</Link>
			);
		}
		let button = (
			<li
				className={cn("page-item", { "disabled": disabled })}
			>
				{inner}
			</li>
		);
		return button;
	}

	private _renderNumbers = () => {
		const { count, page } = this.props;
		const { buttonsCount } = this.state;
		if (buttonsCount > 0) {
			let btnCount = Math.min(buttonsCount, count);
			const buttons = [];
			let first = Math.max(1, Math.ceil(page - buttonsCount / 2));
			let last = first + btnCount - 1;
			if (last > count) {
				last = count;
				first = Math.max(1, last - buttonsCount + 1);
			}
			for (let i = first; i <= last; i++) {
				buttons.push(
					<li
						key={i}
						className={cn("page-item", { "active": i === page })}
					>
						<Link to={spaUrls.users(i)}>

							<span className="page-link">
								{i}
							</span>
						</Link>
					</li>
				);
			}
			return buttons;
		}
		return null;
	}
}