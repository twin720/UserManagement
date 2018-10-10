import * as React from "react";
import UserListPage from "./pages/UserListPage/UserListPage";
import UserPage from "./pages/UserPage/UserPage";
import NotFoundPage from "./pages/NotfoundPage/NotfoundPage";
import { ConnectedRouter } from "react-router-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./redux/history";
import { spaPatterns, spaUrls } from "./helpers/urlHelper";
import "./App.scss";

export default class App extends React.Component<{}, {}> {

	private _redirectToFirstPage = (props) => {
		return (
			<Redirect
				to={{
					pathname: spaUrls.users(1),
					state: { from: props.location }
				}}
			/>
		);
	}

	render() {
		return (
			<ConnectedRouter history={history}>
				<Switch>
					<Route path={spaUrls.home()} exact={true} render={this._redirectToFirstPage} />
					<Route path={spaPatterns.user()} component={UserPage} exact={true} />
					<Route path={spaPatterns.userOperations()} component={UserPage} exact={true} />
					<Route path={spaPatterns.userEdit()} component={UserPage} exact={true} />
					<Route path={spaPatterns.userBalance()} component={UserPage} exact={true} />
					<Route path={spaUrls.usersNoPage()} exact={true} render={this._redirectToFirstPage} />
					<Route path={spaPatterns.users()} exact={true}
						render={
							(props) => {
								let page = Number(props.match.params.pageNumber);
								const isInteger = (num) => (num ^ 0) === num;
								if (!isNaN(page) && isInteger(page)) {
									return (
										<UserListPage
											match={{ params: { pageNumber: page } }}
										/>
									);
								}
								else {
									return <NotFoundPage />;
								}
							}
						}
					/>
					<Route path="*" component={NotFoundPage} />
				</Switch>
			</ConnectedRouter>
		);
	}
}