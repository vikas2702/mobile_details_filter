import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component{

    state = {
        brands: ["Xiaomi", "Samsung", "Realme", "Oppo"]
    }

    render(){
        const { brands } = this.state;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark m-0" style={{padding: "10px 2%"}}>
                <Link className="navbar-brand" to="/">Mobiles</Link>
                <div className="">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/mobiles">All Brands</Link>
                    </li>
                    {brands.map((b) => (
                        <li className="nav-item">
                            <Link className="nav-link" to={`/mobiles/${b}`}>{b}</Link>
                        </li>
                    ))}
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/mobiles/:brand">Xiaomi</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/mobiles/samsung">Samsung</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/mobiles/realme">Realme</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/mobiles/oppo">Oppo</Link>
                    </li> */}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;