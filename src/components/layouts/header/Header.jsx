import React from 'react'
import './Header.css'

import HeaderLogo from '../../../assets/imgs/british-airways-colour-negative-dark-colour.svg'
// import oneworldLogo from '../../assets/img/oneworldLogo_35x35.gif'
// import speedmarguePositiveLogo from '../../assets/imgs/ba_speedmarque_positive.svg'
// import { appName,oneworldLogoTitle,logoAlt } from "../../../assets/data/json/resource.json";
export const Header = () => {
    return (
        <header className='bg-midnight-blue-700 w-full' id="header">
            <section className='flex justify-between items-center h-20 w-full max-w-[1312px] mx-auto px-4'>
                <section className="flex items-center">
                    <a href="https://ecp-prelive-cloud.baplc.com/nx/b/en/gb" aria-label="British Airways, go back to homepage" tabIndex="0" id="logo-ba">
                        <img src={HeaderLogo} alt="british-airways-colour-negative-dark-colour logo" style={{width: '227px', height: 'auto'}}/>
                    </a>
                </section>
                <section className="lg:hidden"></section>
                <section className="items-center flex-1 grow basis-0 justify-end relative flex">
                    <a href="https://www.britishairways.com/content/information/partners-and-alliances/oneworld" aria-label="One world" tabIndex="0" id="header-one-world-link" data-radix-collection-item=""><i aria-hidden="true" className="flex h-[37px] w-[37px] rounded-full bg-white-white p-px ml-4"><div className="ICON" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200" style={{display: 'block', width: '100%', height: 'auto'}}><radialGradient id="a-2368132489" cx="250" cy="250" gradientUnits="userSpaceOnUse" r="250"><stop offset="0" stopColor="#191987" stopOpacity="0"></stop><stop offset="0.5" stopColor="#191987" stopOpacity="0.2"></stop><stop offset="0.8" stopColor="#191987" stopOpacity="0.75"></stop><stop offset="1" stopColor="#191987"></stop></radialGradient><radialGradient id="b-2368132489" cx="250" cy="250" fx="108" fy="60" gradientUnits="userSpaceOnUse" r="300"><stop offset="0" stopColor="#fff" stopOpacity="0.95"></stop><stop offset="0.25" stopColor="#fff" stopOpacity="0.85"></stop><stop offset="0.85" stopColor="#fff" stopOpacity="0"></stop><stop offset="1" stopColor="#fff" stopOpacity="0"></stop></radialGradient><radialGradient id="c-2368132489" cx="250" cy="250" gradientUnits="userSpaceOnUse" r="249"><stop offset="0" stopColor="#534fa3"></stop><stop offset="0.47" stopColor="#191987" stopOpacity="0.55"></stop><stop offset="1" stopColor="#191987" stopOpacity="0"></stop></radialGradient><radialGradient id="d-2368132489" cx="250" cy="250" fx="108" fy="60" gradientUnits="userSpaceOnUse" r="249"><stop offset="0" stopColor="#fff" stopOpacity="0.7"></stop><stop offset="0.25" stopColor="#fff" stopOpacity="0.35"></stop><stop offset="1" stopColor="#9592c7" stopOpacity="0"></stop></radialGradient><radialGradient id="e-2368132489" cx="250" cy="250" gradientUnits="userSpaceOnUse" r="249"><stop offset="0" stopColor="#191987" stopOpacity="0"></stop><stop offset="0.89" stopColor="#191987" stopOpacity="0"></stop><stop offset="0.97" stopColor="#191987" stopOpacity="0.07"></stop><stop offset="1" stopColor="#191987" stopOpacity="0.2"></stop></radialGradient><g transform="matrix(.40160643 0 0 .40160643 -.40160643 -.40160643)"><circle cx="250" cy="250" fill="#5752a6" r="249"></circle><circle cx="250" cy="250" fill="url(#a-2368132489)" r="249"></circle><circle cx="250" cy="250" fill="url(#b-2368132489)" r="249"></circle><circle cx="250" cy="250" fill="url(#c-2368132489)" r="249"></circle><circle cx="250" cy="250" fill="url(#d-2368132489)" r="249"></circle><circle cx="250" cy="250" fill="url(#e-2368132489)" r="249"></circle><path clipRule="evenodd" d="m53.337 285.563c17.191 0 30.249-9.493 30.249-29.853 0-20.12-12.945-29.594-30.249-29.594-15.451 0-30.256 7.82-30.256 29.594 0 20.36 13.057 29.853 30.256 29.853m0-13.04c-10.55 0-11.713-10.439-11.713-16.796 0-15.83 8.397-16.605 11.713-16.605 3.704 0 11.705.775 11.705 16.605 0 6.237-.964 16.796-11.705 16.796" fill="#fff" fillRule="evenodd"></path><path clipRule="evenodd" d="m109.407 228.167h-16.58v55.295h17.269v-28.578c0-2.395.215-15.142 11.576-15.142 9.207 0 9.767 8.82 9.767 14.263v29.457h17.252v-34.728c0-20.568-11.464-22.618-19.292-22.618-7.726 0-15.332 2.601-19.991 8.699" fill="#fff" fillRule="evenodd"></path><path clipRule="evenodd" d="m198.576 267.459c-1.413 4.909-5.151 5.701-9.948 5.701-10.335 0-12.316-7.976-12.419-13.298h41.591l-.104-3.066c-.215-6.752-1.645-30.679-28.525-30.679-18.061 0-31.006 10.439-31.006 29.594 0 28.198 22.419 29.853 29.706 29.853 10.232 0 24.374-2.429 28.732-18.104m-40.395-16.865c.319-5.667 2.963-12.971 12.755-12.971 4.022 0 10.155 1.12 10.37 12.971z" fill="#fff" fillRule="evenodd"></path><polyline clipRule="evenodd" fill="#fff" fillRule="evenodd" points="260.209 233.833 274.945 283.462 281.422 283.462 298.476 228.167 293.136 228.167 278.08 277.691 263.224 228.167 257.186 228.167 242.337 277.691 227.256 228.167 221.925 228.167 238.987 283.462 245.472 283.462"></polyline><path clipRule="evenodd" d="m304.194 255.814c0 16.434 7.425 29.853 25.976 29.853 18.501 0 25.942-13.419 25.942-29.853 0-16.417-7.441-29.818-25.942-29.818-18.551 0-25.976 13.401-25.976 29.818m5.099 0c0-15.659 6.787-25.994 20.877-25.994 14.057 0 20.844 10.335 20.844 25.994 0 15.675-6.787 26.011-20.844 26.011-14.09 0-20.877-10.336-20.877-26.011" fill="#fff" fillRule="evenodd"></path><path clipRule="evenodd" d="m394.318 227.099h-2.566c-9.25 0-16.277 5.65-18.965 12.506h-.207v-11.438h-4.926v55.295h4.926v-26.442c0-22.428 12.023-24.805 19.292-25.029h2.446" fill="#fff" fillRule="evenodd"></path><rect fill="#fff" height="76.172997" width="4.7709999" x="403.396" y="207.289"></rect><path clipRule="evenodd" d="m464.151 207.289v30.146c-3.617-7.407-11.3-11.438-19.913-11.438-13.125 0-24.425 8.389-24.425 29.06 0 6.099 1.016 30.611 24.648 30.611 14.246 0 18.553-8.837 19.448-11.026h.241v8.821h4.961v-76.173m-44.095 47.663c0-11.749 4.736-25.133 18.981-25.133 12.782 0 20.379 10.232 20.379 26.338 0 18.707-10.405 25.667-20.138 25.667-4.289 0-19.222-1.085-19.222-26.872" fill="#fff" fillRule="evenodd"></path></g></svg></div></i></a>
                </section>
            </section>
        </header>
    )
// return (
//     <header id="baHeader" className="relative z-[8] shadow-"role="banner">
//         <div id="globalheader" className='globalHead'>
//             <section id="header" className="flex flex-col sm:flex-row justify-between items-center p-4">
//                 <div className="logoBar flex items-center">
//                     <a href="" aria-label="British Airways Homepage">
//                         <HeaderLogo className="w-40 h-30 sm:w-100 sm:h-60 balogo" />
//                     </a>
//                     <a className="oneworldLogo" href="https://cugdev664.baplc.com/en-gb/information/flight-information/oneworld" title={oneworldLogoTitle} tabIndex="2">
//                         <img src={oneworldLogo} alt={logoAlt} srcSet="" />
//                     </a>
//                     <a className="smallLogo" href="https://cugdev664.baplc.com/en-gb/information/flight-information/oneworld" title={oneworldLogoTitle} tabIndex="2">
//                         <img className="speedmarguePositiveLogo" src={speedmarguePositiveLogo} alt={logoAlt} />
//                     </a>
//                 </div>
//                 <div className="appName">
//                     <h1> {appName} </h1>
//                 </div>
//             </section>
//         </div>
//     </header>
// )

// return(
// <header id="baHeader" className='relative top-0 h-50 z-50 flex  justify-between items-center px-12 py-6 shadow-[0_18px_10px_-9px_rgba(239,239,239,1)]'>
//     {/* left content */}
//     <div className="flex items-center space-x-6 sm:space-x-8 min-w-0">
//         <a href="" aria-label='British Airways Homepage' className='cursor-pointer shrink-0'>
//         <HeaderLogo className="w-40 h-30 sm:w-100 sm:h-60" />
//         </a>
//         <a className="cursor-pointer shrink-0" href="https://cugdev664.baplc.com/en-gb/information/flight-information/oneworld" title="Find out more about oneworld." tabIndex="2">
//                          <img src={oneworldLogo} className="w-10 h-5 sm:w-25 sm:h-20"alt="" srcSet="" />
//                    </a>
//     </div>
//     {/* right content */}
//     <h1 className="text-2xl font-bold text-gray-900 whitespace-nowrap ml-4">
//         Card Details Captured here
//         </h1>
// </header>  
//)
}

export default Header;