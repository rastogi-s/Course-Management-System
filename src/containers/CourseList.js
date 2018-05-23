import React from 'react';
import CourseRow from './../components/CourseRow';
import EmptyRow from './../components/EmptyRow';
import CourseServiceClient from './../services/CourseServiceClient';
import {Link} from 'react-router-dom'

class CourseList extends React.Component {

    constructor(props) {
        super(props);
        this.courseService = CourseServiceClient.instance;
        this.myRef = React.createRef();
        this.state = {
            courses: [],
            course: {},
            sortType: 'modified'
        };
        this.deleteCourse = this.deleteCourse.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.setSortByTitle = this.setSortByTitle.bind(this);
        this.setSortByLastModified = this.setSortByLastModified.bind(this);
        this.setSortByLastOpened = this.setSortByLastOpened.bind(this);

    }

    setSortByTitle() {
        this.setState({sortType: 'title'});
        this.findAllCourses();
    }

    setSortByLastModified() {
        this.setState({sortType: 'modified'});
        this.findAllCourses();
    }

    setSortByLastOpened() {

    }

    deleteCourse(id) {

        this.courseService.deleteCourse(id).then(() => {
            this.findAllCourses();
        });
    }

    componentDidMount() {
        this.findAllCourses();
    }


    sortByDate(jsonObj, dateType) {
        jsonObj.sort(function (p, q) {
            var pDate = new Date(p[dateType]);
            var qDate = new Date(q[dateType]);
            return qDate.getTime() - pDate.getTime();
        });


    }


    sortByTitle(jsonObj) {
        jsonObj.sort(function (p, q) {
            if (p['title'].toLowerCase() > q['title'].toLowerCase())
                return 1;
            else if (p['title'].toLowerCase() < q['title'].toLowerCase())
                return -1;
            else
                return 0;
        });
    }

    findAllCourses() {
        this.courseService.findAllCourses().then((courses) => {
            if (this.state.sortType != 'title')
                this.sortByDate(courses, this.state.sortType);
            else
                this.sortByTitle(courses);

            for (var c in courses) {

                var modifiedDate = courses[c].modified;
                var d = new Date(modifiedDate);
                d = this.handleDate(d);
                courses[c]['displayModDate'] = d;

            }
            this.setState({courses: courses});
        });
    }

    handleDate(date) {

        var month = {
            0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August'
            , 8: 'September', 9: 'October', 10: 'November', 11: 'December'
        };

        var today = new Date();
        var returnDate = date;
        if (date.getDay() === today.getDay() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()) {
            //console.log("todays date:" + date);
            if (date.getHours() < 12) {
                var min=date.getMinutes();
                if(min<10)
                    returnDate = date.getHours() + ':' + '0'+date.getMinutes() + ' AM';
                else
                    returnDate = date.getHours() + ':' + date.getMinutes() + ' AM';
            }
            else {
                var min=date.getMinutes();
                if(min<10)
                    returnDate = date.getHours()- 12 + ':' + '0'+date.getMinutes() + ' PM';
                else
                    returnDate = date.getHours()- 12 + ':' + date.getMinutes() + ' PM';
            }
        }
        else {

            returnDate = month[date.getMonth()] + " " + (date.getDate()) + ", " + date.getFullYear();
        }
        return returnDate;
    }


    courseRow() {
        var courses = this.state.courses;
        var groupedCourses;
        var rows = [];
        if (this.state.sortType != 'title') {
            if (courses != null && courses.length != 0) {
                groupedCourses = this.groupCoursesOnDate(courses);
                //console.log(groupedCourses);
            }


            for (var cat in groupedCourses) {
                //console.log(cat);
                rows.push(<EmptyRow key={cat} day={cat}/>);
                courses = groupedCourses[cat];
                for (var c in courses) {
                    rows.push(<CourseRow course={courses[c]} key={courses[c].id} deleteRow={this.deleteCourse}/>);
                }
            }
        } else {

            for (var c in courses) {
                rows.push(<CourseRow course={courses[c]} key={courses[c].id} deleteRow={this.deleteCourse}/>);
            }
        }


        return (rows);
    }


    groupCoursesOnDate(courses) {

        var month = {
            0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August'
            , 8: 'September', 9: 'October', 10: 'November', 11: 'December'
        };
        var today = new Date();
        var currentDate = {'day': today.getDate(), 'month': today.getMonth(), 'year': today.getFullYear()};
        var newJson = {};
        for (var c in courses) {
            var modifiedDate = new Date(courses[c].modified);

            var modDate = {
                'day': modifiedDate.getDate(),
                'month': modifiedDate.getMonth(),
                'year': modifiedDate.getFullYear()
            };

            console.log();
            if (modDate['year'] < currentDate['year']) {
                if (newJson["Previous Year"] == null)
                    newJson["Previous Year"] = [];
                newJson["Previous Year"].push(courses[c]);
            }
            else if (modDate['year'] === currentDate['year'] && currentDate['month'] - modDate['month'] > 1) {
                if (newJson[month[modDate['month']]] == null)
                    newJson[month[modDate['month']]] = [];
                newJson[month[modDate['month']]].push(courses[c]);
            }
            else if (modDate['year'] === currentDate['year'] && currentDate['month'] - modDate['month'] === 1) {
                if (newJson['Previous Month'] == null)
                    newJson['Previous Month'] = [];
                newJson['Previous Month'].push(courses[c]);
            }
            else if (modDate['year'] === currentDate['year'] && currentDate['month'] === modDate['month']
                && currentDate['day'] - modDate['day'] >= 7) {
                if (newJson['Current Month'] == null)
                    newJson['Current Month'] = [];
                newJson['Current Month'].push(courses[c]);
            }
            else if (modDate['year'] === currentDate['year'] && modDate['month'] === currentDate['month']
                && currentDate['day'] - modDate['day'] < 7 && currentDate['day'] - modDate['day'] > 1) {
                if (newJson['Previous 7 days'] == null)
                    newJson['Previous 7 days'] = [];
                newJson['Previous 7 days'].push(courses[c]);
            }
            else if (modDate['year'] === currentDate['year'] && modDate['month'] === currentDate['month']
                && currentDate['day'] - modDate['day'] === 1) {
                if (newJson['Yesterday'] == null)
                    newJson['Yesterday'] = [];
                newJson['Yesterday'].push(courses[c]);
            }
            else {
                if (newJson['Today'] == null)
                    newJson['Today'] = [];
                newJson['Today'].push(courses[c]);

            }


        }

        console.log(newJson);

        return newJson;

    }


    createCourse() {
        console.log(this.state.course.toString());
        var course = this.state.course;
        if (course.title === undefined || course.title === '') {
            var date = new Date();
            course = {title: 'New Course', created: date.getTime(), modified: date.getTime()};
        }
        this.courseService
            .createCourse(course)
            .then(() => {
                this.setState({
                    course: {title: ''}
                });
                this.myRef.current.value = '';
                this.findAllCourses();
            });

    }

    titleChange(event) {
        var date = new Date();
        console.log(date.getTime());
        this.setState({course: {title: event.target.value, created: date.getTime(), modified: date.getTime()}});
    }


    render() {
        const link = (<Link to={`/course/grid`}><i className="btn fa-1x fa fa-th " title="grid"
                                                   style={{color: 'black'}}></i></Link>);
        return (
            <div>
                <nav className="navbar navbar-dark fixed-top bg-dark">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button className="dropdown-item" type="button">Action</button>
                            <button className="dropdown-item" type="button">Another action</button>
                            <button className="dropdown-item" type="button">Something else here</button>
                        </div>
                    </div>

                    <a className="navbar-brand mr-auto" href="#"><h1
                        style={{fontFamily: 'Serif', paddingLeft: 20, paddingTop: 7}}>Course
                        Manager</h1></a>

                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search Course"
                               aria-label="Search" required/>
                        <i className="btn btn-dark fa-2x fa fa-search" title="Search"
                           style={{color: 'white'}}></i>
                    </form>
                </nav>

                <div style={{
                    paddingTop: "5.5rem",
                    paddingBottom: "5rem",
                    color: "5a5a5a"
                }} className="container">

                    <table className="table">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th><select style={{background: 'lightgrey', border: 'none', fontWeight: 'bold'}}>
                                <option>Owned By Me</option>
                                {/*<option>Owned By Others</option>*/}
                                {/*<option>Owned By Anyone</option>*/}
                            </select>
                            </th>
                            <th>Last Modified</th>
                            <th style={{whiteSpace: "nowrap"}}>
                                <div className="dropdown">
                                    {link}
                                    <i className="btn fa-1x fa dropdown-toggle" title="Sort"
                                       style={{color: 'black'}} id="dropdownMenuButton" data-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false"></i>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" onClick={this.setSortByTitle}>Sort By Title</a>
                                        <a className="dropdown-item" onClick={this.setSortByLastModified}>Sort By Last
                                            Modified</a>
                                    </div>
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <thead>
                        <tr>
                            <th colSpan="3"><input id="newCourse" className="form-control" type="text"
                                                   placeholder="New Course Title" ref={this.myRef}
                                                   onChange={this.titleChange}/>

                            </th>
                            <th><i className="btn btn-dark  fa-2x fa fa-plus " title="Create"
                                   style={{color: 'white', marginLeft: "6px"}}
                                   onClick={this.createCourse}></i>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.courseRow()}
                        </tbody>
                    </table>
                </div>
            </div>


        )
    }
}

export default CourseList;