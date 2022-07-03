import React from 'react'
import SyncLoader from "react-spinners/SyncLoader";

function Loader() {
    return (
        <div style={{marginTop:'500px'}}>
            <div className="sweet-loading text-center">
                <SyncLoader color='#0f1763' loading={true} css='' size={15} />
            </div>
        </div>
    )
}

export default Loader