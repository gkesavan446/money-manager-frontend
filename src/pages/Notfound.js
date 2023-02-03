import { Link } from "react-router-dom";


export function Notfound() {
    return (
        <div className='not-found'>
            <h1>404 Page not found</h1>
            <img src="https://www.sunflowerhospital.in/assets/img/bg/404-error-dribbble-800x600.gif" alt="Page not found" />
            <Link to="/">Click here for Home Page</Link>
        </div>
    );
}
