import React from 'react'

function Information({ message }) {
    return (
        <div class="alert alert-primary" role="alert">
            {message}
        </div>
    )
}

export default Information