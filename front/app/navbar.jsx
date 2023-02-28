import Link from "next/link"

function Navbar() {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="product-card">ProductCard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="products">Products</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
export default Navbar
