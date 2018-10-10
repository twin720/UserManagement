import * as React from "react";
import * as ReactDOM from "react-dom";
import * as cn from "classnames";
import { connect } from 'react-redux';
import { hideError } from "../../redux/application/actions";
import BaseDialog, { IDialog } from "../BaseDialog/BaseDialog";
import "./ErrorBox.scss";

export interface IErrorBoxProps extends IDialog {
    error: string;
}

const dispatchToProps = {
    hideError: hideError
};

type Props = IErrorBoxProps & typeof dispatchToProps;

class ErrorBox extends React.PureComponent<Props, {}> {
    static defaultProps = {
        error: ""
    };

    render() {

        const { error } = this.props;

        if (!error)
            return null;

        const { renderFooter, className } = this.props;
        return (
            <BaseDialog
                {...this.props}
                className={cn("error-box", className)}
                renderBody={() => this.renderBodyHandler()}
                renderFooter={() => this.renderFooterHandler()}
                onClose={this._onCloseHandler}
            />
        );
    }

    renderBodyHandler() {
        const { error, renderBody } = this.props;
        if (renderBody) {
            return renderBody();
        }
        else {
            return (
                <div className="">
                    {error}
                </div>
            );
        }
    }

    renderFooterHandler() {
        const { renderFooter } = this.props;
        if (renderFooter) {
            return renderFooter();
        }
        else {
            return (
                <div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this._onCloseHandler}
                    >
                        Ok
                    </button>
                </div>
            );
        }
    }

    private _onCloseHandler = () => {
        const { hideError } = this.props;
        if (hideError)
            hideError();
    }
}

export default connect(null, dispatchToProps)(ErrorBox);
