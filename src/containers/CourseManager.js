import React from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CourseGrid from './CourseGrid';
class CourseManager extends React.Component {

    render() {

        return (
            <Router>
                <div>
                    <Route path="/course/list"
                           component={CourseList}>
                    </Route>
                    <Route path="/course/grid"
                           component={CourseGrid}>
                    </Route>
                    <Route path="/course/:courseId/edit"
                           component={CourseEditor}>
                    </Route>

                </div>
            </Router>

        )
    }
}

export default CourseManager;