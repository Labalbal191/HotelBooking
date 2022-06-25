import React from 'react'
import { useState } from "react";
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";

function Loader() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    const override = css`
    
    display: block;
    margin: 0 auto;
    border-color: red;
    `;

    return (
        <div style={{marginTop:'500px'}}>
            <div className="sweet-loading text-center">
                <MoonLoader color='#000' loading={loading} css='' size={90} />
            </div>
        </div>
    )
}

export default Loader