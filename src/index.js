import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/jquery/dist/jquery'

import React from 'react';
import ReactDOM from 'react-dom';
import CourseManager from './containers/CourseManager';


var containers = (

    <div className="container" >
        <CourseManager/>
    </div>

);




ReactDOM.render(containers,document.getElementById('root'));
