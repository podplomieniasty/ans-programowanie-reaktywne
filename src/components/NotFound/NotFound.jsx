import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">404 - Not Found</h1>
            <p className="lead">The page you're looking for doesn't exist.</p>
            <hr className="my-4" />
            <p>Go back to Home</p>
            <Link className="btn btn-primary btn-lg"
            to="/"
            role="button">
                Home
            </Link>
        </div>
    )
}

export default NotFound;