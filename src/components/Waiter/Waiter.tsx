import * as React from "react";
import * as cn from "classnames";
import "./Waiter.scss";

interface WaiterProps {
    className?: string;
}

export default class Waiter extends React.Component<WaiterProps, {}> {
    render() {
        const { className } = this.props;
        return (
            <div className={cn("waiter", className) }>
                <div className="waiter__back">
                </div>
                <div className="waiter__img">
                </div>
            </div>
        );
    }
}
