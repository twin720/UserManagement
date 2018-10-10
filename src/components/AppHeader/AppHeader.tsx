import * as React from "react";
import * as cn from "classnames";
import { Link } from "react-router-dom";
import "./AppHeader.scss";

export interface IAppHeader {
    title?: string;
    homeLink?: string;
}

export default class AppHeader extends React.Component<IAppHeader, {}> {
    render() {
        const { title, homeLink } = this.props;
        return (
            <div className="app-header">
                {
                    homeLink &&
                    <Link to={homeLink} className="app-header__home-link">
                        <div>Home</div>
                    </Link>
                }
                <div className="app-header__title">{title}</div>
            </div>
        );
    }
}
