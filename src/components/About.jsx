import React from 'react';
 
const About = (props) => {
    return (
       <div>
          <h1>About {props.match.params.who}</h1>
          <p>About US page body content</p>
       </div>
    );
}
 
export default About;