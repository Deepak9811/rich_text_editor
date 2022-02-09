import React, { Component } from 'react'
import Link from "next/link";
import Router from "next/router";
import Head from "next/head";

import { TailSpin } from 'react-loader-spinner'

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            pass: "",
            loggedin: false,
            loading: false,
        };
    }

    // componentDidMount(){
    //     Router.push("/home");
    // }


    // loginCheck(e) {
    //     // Router.push("/home");
    //     if (this.state.email === "" || this.state.pass === "") {
    //         alert("Please enter something");
    //     } else if (this.state.email !== "" && this.state.pass !== "") {
    //         if (this.state.email === "dk@gmail.com" && this.state.pass === "9811") {
    //             localStorage.setItem("admin", "Deepaksingh");
    //             Router.push("/home");
    //         } else {
    //             alert("Please enter correct ID or Password.");
    //         }
    //     }
    // };



    loginCheck = () => {
        if (
            this.state.email === "" ||
            this.state.pass === ""
        ) {
            this.setState({ message: "Please enter your account details to login." });
        } else if (
            this.state.email !== "" &&
            this.state.pass !== ""
        ) {
            this.setState({ loading: true });

            fetch(`http://192.168.1.217:1003/api/Login`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Email: this.state.email,
                    Password: this.state.pass
                }),
            })
                .then((result) => {
                    result.json().then((resp) => {
                        if (resp.response === "Success") {
                            localStorage.setItem("user_info", JSON.stringify(resp.data));
                            localStorage.setItem(
                                "user_name",
                                JSON.stringify(resp.data.Name)
                            );
                            localStorage.setItem("libCode", JSON.stringify(resp.data.LibCode));
                            Router.push(`/home`);
                        } else {
                            this.setState({
                                message: "No data found please check your details.",
                                loading: false
                            })
                            // this.setState({ message: "Try with other details." });
                            console.log(resp.response)
                        }
                    });
                })

                //CATCHING ERROR FROM FETCH (IF ANY) IN API
                .catch((error) => {
                    this.setState({
                        message: "Please check your credentials.",
                        loading: false,
                    });
                });
        }
    };

    render() {
        const { email, pass } = this.state
        return (
            <>
                <Head>
                    <title>Log In</title>
                </Head>
                <div className="bckLog">

                    <div className="modal-dialog w-100 mx-auto mb-3 text-center nmc" >
                        <span style={{ fontSize: "22px" }}>L I B C O N</span>
                    </div>

                    <div className="form-signin">



                        <form
                            type="POST"
                            onSubmit={(e) => {
                                this.loginCheck();
                            }}
                        >
                            <div className="modal-body">


                                <div className="h5 modal-title text-center">
                                    <h4 className="mt-2">
                                        <span>Sign In</span>
                                    </h4>
                                </div>

                                <div className="position-relative form-group">
                                    <label htmlFor="inputEmail" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        type="text"
                                        id="inputEmail"
                                        className="form-control valid"
                                        placeholder="Email"
                                        required=""
                                        autoFocus=""
                                        autoComplete=""
                                        value={email}
                                        onChange={(event) =>
                                            this.setState({
                                                email: event.target.value,
                                                message: ''
                                            })
                                        }
                                    />
                                </div>





                                <div className="position-relative form-group">
                                    <label htmlFor="inputPassword" className="sr-only mt-5">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="inputPassword"
                                        className="form-control mt-10"
                                        placeholder="Password"
                                        required=""
                                        value={pass}
                                        onChange={(event) => this.setState({ pass: event.target.value, message: '' })}
                                    />
                                </div>




                                <div className="position-relative form-check">
                                    <input
                                        className="form-check-input"
                                        // id="RememberMe" 
                                        // name="RememberMe" 
                                        type="checkbox"
                                        value="true" />
                                    {/* <input 
                                name="RememberMe" 
                                type="hidden" 
                                value="false" /> */}
                                    <label className="form-check-label">Keep me logged in</label>
                                </div>



                                {this.state.message ? (
                                    <p className="type_error">{this.state.message}</p>
                                ) : null}


                            </div>

                            <div className="modal-footer clearfix">
                                <div className="float-left">
                                    <Link href="#" className="btn-lg btn btn-link">
                                        <a>
                                            Recover Password
                                        </a>
                                    </Link>
                                </div>
                                <div className="float-right">
                                    {!this.state.loading ? (
                                        <button className="btn btn-primary btn-lg"
                                            type="submit"
                                            onClick={() => {
                                                this.loginCheck();
                                            }} >
                                            Login to Dashboard
                                        </button>
                                    ) : (
                                        <div className="loader_in_option2">
                                            <TailSpin color="#00BFFF" height={30} width={50} ariaLabel='loading' />
                                        </div>
                                    )}

                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </>
        );
    }
}

