import * as React from "react";
import * as ReactDOM from "react-dom";
import * as cn from "classnames";
import { connect } from 'react-redux';
import { createUser } from "../../redux/users/actions";
import { updateUser } from "../../redux/user/actions";
import { Modal } from "react-bootstrap";
import { IStore } from "../../redux/store";
import BaseDialog, { IDialog } from "../BaseDialog/BaseDialog";
import { IUser } from "../../models/user";
import { isEmail } from "../../helpers/stringHelper";
import "./UserDialog.scss";

interface IUserDialogInitalState {
    inputIDValue: string,
    inputNameValue: string,
    inputCustomValue: string,
    inputEmailValue: string,
    inputEnabledValue: boolean,
    idError: string,
    emailError: string;
}

export interface IUserDialogProps extends IDialog {
    user: IUser;
    onAccept: () => void;
}

const mapStateToProps = (state: IStore, props: Props) => {
    return {
    };
};

const dispatchToProps = {
    createUser: createUser,
    updateUser: updateUser
};

type Props = typeof dispatchToProps & IUserDialogProps;

class UserDialog extends React.Component<Props, IUserDialogInitalState> {
    private _inputID;
    private _inputName;
    private _inputCustom;
    private _inputEmail;
    private _inputEnabled;
    private _container;

    // constructor(props: Props) {
    //     super(props);

    //     this.state = {
    //         inputIDValue: "",
    //         inputNameValue: "",
    //         inputCustomValue: "",
    //         inputEmailValue: "",
    //         inputEnabledValue: false,
    //         idError: "",
    //         emailError: ""
    //     };
    // }

    constructor(props?, context?) {
        super(props, context);
        this.state = this.getInitialState(props);
    }

    private getInitialState(props): IUserDialogInitalState {
        const { user } = props;
        return {
            inputIDValue: user && user.user_id ? user.user_id : "",
            inputNameValue: user && user.user_name ? user.user_name : "",
            inputCustomValue: user && user.user_custom ? user.user_custom : "",
            inputEmailValue: user && user.email ? user.email : "",
            inputEnabledValue: user && user.enabled,
            idError: "",
            emailError: ""
        };
    }

    render() {
        return (
            <BaseDialog
                {...this.props}
                className={cn(this.props.className, "user-dialog")}
                renderBody={this.renderBody.bind(this)}
                renderFooter={this.renderFooter.bind(this)}
            />
        );
    }

    componentWillReceiveProps(nextProps: Props) {
        const { user } = nextProps;
        this.setState({
            inputIDValue: user && user.user_id ? user.user_id : "",
            inputNameValue: user && user.user_name ? user.user_name : "",
            inputCustomValue: user && user.user_custom ? user.user_custom : "",
            inputEmailValue: user && user.email ? user.email : "",
            inputEnabledValue: user && user.enabled
        });
    }

    renderBody() {
        const isEdit = this.props.user != null;
        return (
            <div>
                {
                    !isEdit &&
                    <div className="form-group">
                        <label>ID</label>
                        <input type="text" placeholder="ID"
                            className={cn("form-control", { "errorField": !!this.state.idError })}
                            value={this.state.inputIDValue}
                            ref={input => this._inputID = input}
                            onChange={this._onIDChange}
                        />
                        {
                            this.state.idError &&
                            <span className="errorField">{this.state.idError}</span>
                        }
                    </div>
                }
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Name"
                        value={this.state.inputNameValue}
                        ref={input => this._inputName = input}
                        onChange={this._onNameChange}
                    />
                </div>
                <div className="form-group">
                    <label>Custom name</label>
                    <input type="text" className="form-control" placeholder="Custom name"
                        value={this.state.inputCustomValue}
                        ref={input => this._inputCustom = input}
                        onChange={this._onCustomChange}
                    />
                </div>
                <div className="form-group">
                    <label>E-mail address</label>
                    <input type="email" placeholder="E-mail address"
                        className={cn("form-control", { "errorField": !!this.state.emailError })}
                        value={this.state.inputEmailValue}
                        ref={input => this._inputEmail = input}
                        onChange={this._onEmailChange}
                    />
                    {
                        this.state.emailError &&
                        <span className="errorField">{this.state.emailError}</span>
                    }
                </div>
                <div className="form-group">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox"
                                    checked={this.state.inputEnabledValue}
                                    ref={input => this._inputEnabled = input}
                                    onChange={this._onEnabledChange}
                                />
                                Enabled
                            </label>
                        </div>
                </div>
            </div>
        );
    }

    renderFooter() {
        const isEdit = this.props.user != null; 
        return (
            <div>
                <button type="button"
                    className="btn btn-primary"
                    onClick={this._onAcceptClick}>
                    {isEdit ? "Updatae" : "Create"}
                </button>

                <button type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.props.onClose}
                >
                    Cancel
                </button>
            </div>
        );
    }

    private _onAcceptClick = () => {
        const { inputIDValue, inputNameValue, inputCustomValue, inputEmailValue, inputEnabledValue } = this.state;
        const { createUser, updateUser, onAccept} = this.props;

        const isEdit = this.props.user != null;
        let user: IUser;

        if (isEdit) {
            user = this.props.user;
        } else {
            user = {
                user_id: "",
                user_name: "",
                user_custom: "",
                email: "",
                enabled: false,
            }
        }

        const id = inputIDValue.trim();
        const idError = !id ? "User ID cannot be empty" : "";

        const email = inputEmailValue.trim();
        const emailError = email && !isEmail(email) ? "String is not e-mail ardess." : "";

        if (idError || emailError) {
            this.setState({
                idError,
                emailError
            });
            return;
        }

        user.user_id = id;
        user.user_name = inputNameValue.trim();
        user.user_custom = inputCustomValue.trim();
        user.enabled = inputEnabledValue;
        user.email = email;

        if (isEdit) {
            updateUser(user);
        }
        else {
            createUser(user);
        }
        onAccept();
    }

    private _onIDChange = () => {
        this.setState({
            inputIDValue: this._inputID.value,
            idError: ""
        });
    }

    private _onNameChange = () => {
        this.setState({
            inputNameValue: this._inputName.value,
        });
    }

    private _onCustomChange = () => {
        this.setState({
            inputCustomValue: this._inputCustom.value,
        });
    }

    private _onEmailChange = () => {
        this.setState({
            inputEmailValue: this._inputEmail.value,
            emailError: ""
        });
    }

    private _onEnabledChange = () => {
        this.setState({
            inputEnabledValue: this._inputEnabled.checked,
        });
    }
}

export default connect(mapStateToProps, dispatchToProps)(UserDialog);