import React from 'react';

class CourseList extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h2>Course List</h2>
                <table>
                    <thead><tr><th>Title</th></tr></thead>
                    <tbody><tr><td>Course Row</td></tr></tbody>
                </table>
            </div>

        )
    }
}

export default CourseList;