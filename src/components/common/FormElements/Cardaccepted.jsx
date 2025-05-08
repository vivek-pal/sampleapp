import React from 'react'

export const Cardaccepted = () => {
  return (
    <div id="CardAcceptedFieldRow" className="relative w-full">
        {/* <p className='mb-[1.2rem]'>We accept the following payment cards</p> */}
        <div className="card-images">
            <a className="cardIcon VR VIS changeCardSchemeIcon" id="VR" tabIndex="28" data-cardsequence="1" data-cardicon="VRC" data-pcicardicon="VIS" title="Visa Card"></a>
            <a className="cardIcon SW MAU changeCardSchemeIcon" id="SW" tabIndex="28" data-cardsequence="1" data-cardicon="SWC" data-pcicardicon="MAU" title="Switch/Maestro Corporate (no fee)">{/* <!--Space--> */}</a>
            <a className="cardIcon VR VIS changeCardSchemeIcon" id="VR" tabIndex="28" data-cardsequence="1" data-cardicon="VRC" data-pcicardicon="VIS" title="Visa Card">{/* <!--Space--> */}</a>
        </div>
    </div>
  )
}
