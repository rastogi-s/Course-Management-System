import React from 'react';

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <a className="navbar-brand" href="#">Course Manager</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <form className="">
                                <input className="form-control mr-sm-2" type="text" placeholder="New Course Title"
                                       aria-label="Search"/>
                            </form>
                        </li>
                        <li className="nav-item">
                            <i className="btn fa-2x fa fa-plus" title="Create" style={{color:'white'}}></i>
                        </li>

                    </ul>

                </div>
            </nav>
        )
    }
}

export default NavBar;