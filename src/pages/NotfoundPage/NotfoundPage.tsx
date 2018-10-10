import * as React from "react";
import AppBody from "../../components/AppBody/AppBody";
import "./NotFoundPage.scss";

export default class NotFoundPage extends React.Component {
    render() {
        return (
            <AppBody
                className="page-not-found"
                title="Users Management"
                showHomeLink={false}
            >
                <h1 className="page-not-found__body">Page not found</h1>
            </AppBody>
        );
    }
}