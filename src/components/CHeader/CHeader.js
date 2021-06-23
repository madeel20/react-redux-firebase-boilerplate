import React from 'react'
import { Link, useHistory } from 'react-router-dom';

/**
 * This is a shared header for all the screens
 * @returns {JSX}
 */
function CHeader() {
    
    const history = useHistory();

    return (
        <div className="c-header">

            <div className="first-header">

                <Link to="/">
                    <h1 className="title ml-2">Logo logo</h1>
                </Link>

                <div className="actions-bar">
                    <h4>Action bar</h4>
                </div>

            </div>

        </div>

    )
}

export default CHeader
