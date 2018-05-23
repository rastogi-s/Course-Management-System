import React from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';
import CourseGrid from './CourseGrid';
// import Home from './Home';

class CourseManager extends React.Component {

    render() {

        return (

            <Router>
                <div>
                    {/*<Route path="/" component={Home}>*/}
                    {/*</Route>*/}
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