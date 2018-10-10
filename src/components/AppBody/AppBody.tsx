import * as React from "react";
import * as cn from "classnames";
import AppHeader from "../AppHeader/AppHeader";
import { IStore } from "../../redux/store";
import { connect } from "react-redux";
import Waiter from "../Waiter/Waiter";
import ErrorBox from "../ErrorBox/ErrorBox";
import "./AppBody.scss";
import { spaUrls } from '../../helpers/urlHelper';

export interface IAppBodyProps {
    className?: string;
    title?: string;
    loading: boolean;
    pageNumber?: number;
    showHomeLink?: boolean;
    error?: string;
}

const mapStateToProps = (state: IStore, props: IAppBodyProps) => {
    return {
        loading: state.application.loading,
        pageNumber: state.users.pageNumber,
        error: state.application.error,
    };
};

class AppBody extends React.Component<IAppBodyProps, {}> {
    render() {
        const { children, className, title, loading, pageNumber, showHomeLink, error } = this.props;
        let homeLink = showHomeLink ? spaUrls.users(pageNumber) : "";
        return (
            <div className={cn("app-body", className)}>
                <ErrorBox
                    show={error != null}
                    error={error}
                    title="Error"
                />
                <AppHeader title={title} homeLink={homeLink} />
                {loading && <Waiter />}
                <div className="app-body__body-content">
                    {children}
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, null)(AppBody);