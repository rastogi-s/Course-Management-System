import React from 'react';
import CourseList from './CourseList';

class CourseManager extends React.Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-dark  fixed-top bg-primary">
                    <a className="navbar-brand" href="#"><h1 style={{fontFamily:'Serif'}}>Course Manager</h1></a>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search Course" aria-label="Search" required/>
                        <i className="btn fa-2x fa fa-search" title="Search"
                           style={{color: 'white', background: 'red',  borderRadius: "50px"}}></i>
                    </form>
                </nav>

                <div style={{
                    paddingTop: "5rem",
                    paddingBottom: "5rem",
                    color: "5a5a5a"
                }}>
                    <CourseList/>
                </div>
            </div>
        )
    }
}

export default CourseManager;