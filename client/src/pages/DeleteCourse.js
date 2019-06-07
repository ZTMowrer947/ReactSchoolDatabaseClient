// Imports
import axios from "axios";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

// Component
class DeleteCourse extends React.Component {
    // Constructor
    constructor(props) {
        // Pass props to base class
        super(props);

        // Initialize state
        this.state = {
            course: null,
            confirmTitle: "",
            isLoading: true,
        }
    }

    // Handle input changes
    handleInputChange(event) {
        // Get event target's name and value
        const { name, value } = event.target;

        // Update state for input field
        this.setState({
            [name]: value,
        });
    }

    // Handle form submission
    handleFormSubmit(event) {
        // Prevent default behavior
        event.preventDefault();

        // Get form data
        const { confirmTitle } = this.state;

        // If the confirm title field matches the course title,
        if (this.state.course.title === confirmTitle) {
            // Get user credentials
            const credentials = this.props.getCredentials();

            // Delete the course
            axios.delete(`http://localhost:5000/api/courses/${this.state.course.id}`, {
                headers: {
                    authorization: `Basic ${credentials}`,
                }
            })
                // If this is successful,
                .then(() => {
                    // Redirect to home page
                    this.props.history.push("/");
                });
        }
    }

    componentDidMount() {
        // Get course ID
        const { id } = this.props.match.params;

        // Get course by ID
        axios.get(`http://localhost:5000/api/courses/${id}`)
            // If this succeeds,
            .then(response => {
                // Store course in state
                this.setState({
                    course: response.data,
                    isLoading: false,
                });
            });
        // TODO: Handle errors
    }

    // Render to DOM
    render() {
        // If we are still loading
        if (this.state.isLoading)
            // Render loading indicator
            return <h1>Loading...</h1>;

        // Otherwise, render delete confirmation form
        return (
            <div className="bounds grid-66">
                <div>
                    <h4 className="course--label">Delete Course</h4>
                </div>
                <div>
                    <form method="POST" onSubmit={this.handleFormSubmit.bind(this)}>
                        <div>
                            <h1>Warning!</h1>
                            <p>This will delete the "{this.state.course.title}" course. Once it is deleted, it <strong>CANNOT</strong> be recovered.</p>
                            <p>Please type the course title below to confirm the deletion.</p>
                        </div>
                        <div>
                            <input
                                id="confirmTitle"
                                name="confirmTitle"
                                type="text"
                                className="input-title course--title--input"
                                placeholder="Confirm title..."
                                onChange={this.handleInputChange.bind(this)}
                                value={this.state.confirmTitle}
                            />
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">DELETE Course</button>
                            <Link to="/" className="button button-secondary">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

// Prop Types
DeleteCourse.propTypes = {
    getCredentials: PropTypes.func.isRequired,
    user: PropTypes.shape({
        emailAddress: PropTypes.string.isRequired,
    }).isRequired,
}

// Export
export default DeleteCourse;