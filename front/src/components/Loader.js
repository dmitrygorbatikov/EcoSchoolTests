import React from "react"

export const Loader = () => {
    return(
        <div className="loader" style={{textAlign: 'center', marginTop: '15%'}}>
            <div className="lds-dual-ring"></div>
        </div>
    )
}