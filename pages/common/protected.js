import React, { PureComponent } from "react";
import Router from 'next/router';
import { Bars } from 'react-loader-spinner'

class Protected extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        var adminStatus = localStorage.getItem("user_email");
        //Setting up admin status
        if (!adminStatus) {
            Router.push("/login");
        }
        else {
            this.setState({
                admin: true,
                loading: false,
            })
        }
    }

    render() {
        return (
            this.state.loading ?
                <div className="loginloader">
                    <Bars color="#00BFFF" height={60} width={80} ariaLabel='loading' />
                </div>
                :
                this.state.admin ?
                    <div>{this.props.children}</div>
                    : <p>Please login.</p>
        )
    }
}

export default Protected;
