import React from 'react'
// import './Footer.css'
// import FooterLogo from '../../../assets/imgs/svg/FooterLogo'
import footerLogo_svg from '../../../assets/imgs/speedmarque-colour-negative-colour.svg'
import facebook from '../../../assets/imgs/svg/Facebook.svg'
import instagram from '../../../assets/imgs/svg/Instagram.svg'
import linkedin from '../../../assets/imgs/svg/LinkedIn.svg'
import tiktok from '../../../assets/imgs/svg/TikTok.svg'
import xTwitter from '../../../assets/imgs/svg/XTwitter.svg'
import youtube from '../../../assets/imgs/svg/Youtube.svg'

export const Footer = () => {
  return (
    <footer id="baFooter" role="contentinfo" className='FOOTER w-full flex-col bg-midnight-blue-700 px-8 pb-6 lg:px-4 lg:pb-10'>
			<section className='IconsCopy ml-auto mr-auto max-w-[1312px] px-0 pt-8 lg:items-start'>
        <section className='LOGO-WHITE-SOCIALS mb-8 flex max-w-[1312px] flex-col items-start px-0 lg:flex-row lg:justify-between'>
          <nav aria-label="" data-orientation="horizontal" dir="ltr" className="flex w-max border-0 bg-transparent p-0 py-5 lg:py-0">
            <a href="#" aria-label="Go to home page. By clicking, you will be redirected to the site's home page." data-radix-collection-item="">
              <span className="flex items-center gap-7" aria-hidden="true" data-testid="footer-negative-dark-logo">
                <img src={footerLogo_svg} alt="speedmarque-colour-negative-colour logo" style={{width: '101px', height: 'auto'}} />
              </span>
            </a>
          </nav>

          <div className="Icons mr-3 flex justify-end gap-x-0 pb-8 pt-5 lg:pb-0 lg:pt-0 " data-testid="footer-social-icons">
            <nav aria-label="" data-orientation="horizontal" dir="ltr" className="flex gap-8 flex-row flex-wrap w-full">
              <a href="https://www.facebook.com/britishairways" aria-label="You are in the 1 link of 6. By clicking, you will be redirected to Facebook’s page." data-radix-collection-item="">
                <div className="ICON" data-testid="social-icons-facebook-icon" aria-hidden="true">
                  <div style={{backgroundImage: `url("${facebook}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width: '24px', height: '24px'}}>
                  </div>
                </div>
              </a>
              
              <a href="https://www.instagram.com/british_airways" aria-label="You are in the 2 link of 6. By clicking, you will be redirected to Instagram’s page." data-radix-collection-item="">
                <div className="ICON" data-testid="social-icons-instagram-icon" aria-hidden="true">
                  <div style={{backgroundImage: `url("${instagram}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width: '24px', height: '24px'}}>
                  </div>
                </div>
              </a>
              
              <a href="https://www.linkedin.com/company/british-airways" aria-label="You are in the 3 link of 6. By clicking, you will be redirected to LinkedIn’s page." data-radix-collection-item="">
                <div className="ICON" data-testid="social-icons-linkedin-icon" aria-hidden="true">
                  <div style={{backgroundImage: `url("${linkedin}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width: '24px', height: '24px'}}>
                  </div>
                </div>
              </a>
              
              <a href="https://www.tiktok.com/@british_airways?lang=en" aria-label="You are in the 4 link of 6. By clicking, you will be redirected to TikTok’s page." data-radix-collection-item="">
                <div className="ICON" data-testid="social-icons-tiktok-icon" aria-hidden="true">
                  <div style={{backgroundImage: `url("${tiktok}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width: '24px', height: '24px'}}>
                  </div>
                </div>
              </a>
              
              <a href="https://twitter.com/british_airways" aria-label="You are in the 5 link of 6. By clicking, you will be redirected to XTwitter’s page." data-radix-collection-item="">
                <div className="ICON" data-testid="social-icons-xtwitter-icon" aria-hidden="true">
                  <div style={{backgroundImage: `url("${xTwitter}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width: '24px', height: '24px'}}>
                  </div>
                </div>
              </a>
              
              <a href="https://www.youtube.com/c/BritishAirways" aria-label="You are in the 6 link of 6. By clicking, you will be redirected to Youtube’s page." data-radix-collection-item="">
                <div className="ICON" data-testid="social-icons-youtube-icon" aria-hidden="true">
                 <div style={{backgroundImage: `url("${youtube}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width: '24px', height: '24px'}}>
                  </div>
                </div>
              </a>
            </nav>
          </div>
        </section>
        <section className='Copyright flex max-w-[1312px] flex-col items-start align-baseline lg:flex-row lg:justify-between'>
          <div className="pb-4 lg:pb-0">
            <p className="font-open-sans font-light leading-6 tracking-wider text-white" data-testid="footer-copyrightText">© British Airways - all rights reserved</p>
          </div>
        </section>
        {/* <div id="footerWrapper">
          <div className="footerImages">
            <div className="footerImage">
              <FooterLogo/>
            </div>
          </div>
        </div> */}
			</section>
		</footer>
  )
}

export default Footer;