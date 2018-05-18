import React from 'react';
import CourseList from './CourseList';
import NavBar from './../components/NavBar';


class CourseManager extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark flex-nowrap fixed-top bg-primary">
                    <a className="navbar-brand" href="#"><h1 style={{fontFamily:'Serif'}}>Course Manager</h1></a>
                        <input className="form-control  " type="text" placeholder="New Course Title"/>
                        <i className="btn fa-2x fa fa-plus " title="Create" style={{color: 'white',background:'red',marginLeft:"6px",borderRadius:"50px"}}></i>
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