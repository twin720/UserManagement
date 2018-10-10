import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import * as cn from "classnames";

import "./BaseDialog.scss";

export interface IDialog {
    title?: string;
    show: boolean;
    onClose?: () => void;
    onShow?: () => void;
    bodyHeight?: number;
    animation?: boolean;

    className?: string;
    modalClassName?: string;
    renderBody?: () => HTMLElement | JSX.Element;
    renderFooter?: () => HTMLElement | JSX.Element;
}

export default class BaseDialog extends React.Component<IDialog, {}> {

    static defaultProps = {
        title: ""
    };

    render() {
        const { show, bodyHeight, title, animation, className, modalClassName, renderBody, renderFooter } = this.props;

        return (
            <div className="static-modal">
                <Modal
                    className={cn("base-dialog-modal", modalClassName)}
                    dialogClassName={cn("BaseDialog", className)}
                    show={show}
                    onHide={this.closeHandler.bind(this)}
                    onShow={this.showHandler.bind(this)}
                    animation={animation === true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={this.props.bodyHeight ? { height: this.props.bodyHeight + "px" } : {}}>
                        {renderBody ? renderBody() : this.renderDefaultBody()}
                    </Modal.Body>
                    <Modal.Footer>
                        {renderFooter ? renderFooter() : this.renderDefaultFooter()}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    private renderDefaultBody() {
        return (<div></div>);
    }

    private renderDefaultFooter() {
        return <Button onClick={this.props.onClose}>
            <span>Close</span>
        </Button>;
    }

    protected showHandler() {
        if (this.props.onShow)
            this.props.onShow();
    }

    protected closeHandler() {
        if (this.props.onClose)
            this.props.onClose();
    }
}