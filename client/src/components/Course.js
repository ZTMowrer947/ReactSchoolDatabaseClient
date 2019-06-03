// Imports
import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";

// Components
const Course = props => (
    <div className="bounds course--detail">
        <div className="grid-66">
            <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{props.title}</h3>
                <p>By {props.user.firstName} {props.user.lastName}</p>
            </div>
            <div className="course--description">
                <ReactMarkdown source={props.description} />
            </div>
        </div>
        <div className="grid-25 grid-right">
            <div className="course--stats">
                <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{props.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ReactMarkdown source={props.materialsNeeded} />
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

// Prop Types
Course.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    estimatedTime: PropTypes.string.isRequired,
    materialsNeeded: PropTypes.string.isRequired,
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
    }).isRequired,
}


// Export
export default Course;