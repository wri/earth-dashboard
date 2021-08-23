import Link from 'next/link';

function PageNotFound() {
    return (
        <div
            id="#main"
            className="l-error"
        >
            <div className="container">
                <h1>404</h1>
                <p>This page could not be found</p>
                <Link href="/">
                    <a className="c-button -primary">
                        Go to Earth Dashboard
              </a>
                </Link>
            </div>
        </div>
    );
}

export default PageNotFound;