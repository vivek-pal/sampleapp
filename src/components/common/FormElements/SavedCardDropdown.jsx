import React, { useState, useEffect } from 'react'

export const SavedCardDropdown = () => {
    const [selectedOption, setSelectedOption] = useState('payWithoutAvios'); // default selected
    const [selectedCard, setSelectedCard] = useState(null);
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // Automatically select the first card as default
    useEffect(() => {
        if (cardOptions.length > 0) {
            setSelectedCard(cardOptions[0]);
        }
    }, []);

    const handleSelect = (card) => {
        setSelectedCard(card);
        setOpen(false);
        console.log("Selected Card:", card);
        // You can trigger other effects here too
      };

    const cardOptions = [
        {
          token: 'CLvb_uFs6cUGDj9X',
          schemeName: 'Visa Debit Personal',
          ending: '1000',
          expiry: '11/32',
          surcharge: '(no fee)',
          logoClass: 'cardVDP',
          schemeCode: 'VIS',
        },
        {
          token: 'Xyz_abc123456',
          schemeName: 'MasterCard Platinum',
          ending: '3456',
          expiry: '08/26',
          surcharge: '(2% fee)',
          logoClass: 'cardMC',
          schemeCode: 'MC',
        },
    ];
  return (
    <div className='mb-4'>
        <div className="transition-[padding, max-height] duration-300 py-3 max-h-auto overflow-visible visible opacity-100 filter-none mb-2 space-y-8" aria-hidden="false" aria-labelledby="button--nx-id-:r9:--0" id="panel--nx-id-:r9:--0" style={{visibility: 'visible'}}>
            <div data-testid="radio-1--radio-container" className='mb-4'>
                <label htmlFor="radio-1" data-testid="radio-1--radio-label" className="flex cursor-pointer items-center space-x-2">
                    <div className="bg-white-white relative mr-2 h-6 w-6 rounded-full focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 focus-within:outline-blue-500">
                        <input id="radio-1" type="radio" name="SavedCardSupported" className="sr-only" aria-invalid="false" data-testid="radio-1--radio-input" role="radio" value="payWithoutAvios" checked={selectedOption === 'payWithoutAvios'} onChange={handleChange}/>
                        <span className="absolute inset-0 rounded-full border border-grey-600"></span>
                        {selectedOption === 'payWithoutAvios' && (
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform" aria-hidden="true" style={{height: '18px', width: '18px', transition: '0.3s', borderRadius: '50%', backgroundColor: 'rgb(52, 104, 173)', transform: 'translate(0%, 0%)'}}></span>
                        )}
                    </div>
                    <span className="text--midnight-blue-500 select-none font-mylius-modern">
                        <span className="font-mylius-modern font-light inline-flex flex-col justify-center items-start gap-2 leading-snug text-base leading-7 text-midnight-blue-500" data-testid="text-custom--text-custom" id="text-custom">
                        Use a saved payment card</span>
                    </span>
                </label>
            </div>

            <div className="w-[350px] max-w[350px] relative">
                {/* Display selected value */}
                <div className="block w-full appearance-none rounded-lg border border-grey-600 px-4 py-3 pr-10 font-mylius-modern font-light text-midnight-blue-500 hover:outline hover:outline-2 hover:outline-offset-1 hover:outline-blue-500 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-blue-500 bg-white overflow-hidden whitespace-nowrap text-ellipsis"
                    onClick={() => setOpen(!open)}
                    style={{ zIndex: 501 }}
                    data-token={selectedCard?.token}
                    id="selectedOption"
                >
                    {selectedCard ? (
                    <>
                        <div className={`card-logo ${selectedCard.logoClass}`}
                        title={selectedCard.schemeName}
                        data-pcicardscheme={selectedCard.schemeCode}
                        ></div>
                        <p className="personaldata truncate flex items-center">
                            <span className="card-scheme-icon flex">
                                <a className="cardIcon VR VIS changeCardSchemeIcon" id="VR" tabIndex="28" data-cardsequence="1" data-cardicon="VRC" data-pcicardicon="VIS" title="Visa Card"></a>
                            </span>
                            <span className="card-scheme-name">{selectedCard.schemeName}</span>, ending:{' '}
                            <span className="card-ending-number">{selectedCard.ending}</span> expires:{' '}
                            <span className="card-expiry-date">{selectedCard.expiry}</span>
                            <span className="card-surcharge"> {selectedCard.surcharge}</span>
                        </p>
                    </>
                    ) : (
                    <span className="text-gray-500">Select type of card</span>
                    )}
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <div className="ICON [&>svg]:ds-cr-fill-midnight-blue-500 [&>svg>path]:ds-cr-fill-midnight-blue-500 inset-y-0 right-0" aria-hidden="true">
                    <div aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.9246 1.37787C18.5164 3.28184 17.0076 4.98539 15.4989 6.68893C13.9901 8.39248 12.3808 10.096 10.7715 11.6994C10.3691 12.1002 9.66507 12.1002 9.26273 11.6994C8.45807 10.8977 7.6534 9.99582 6.84873 9.09394C6.04407 8.19207 5.2394 7.29019 4.53532 6.38831C3.02657 4.58455 1.51782 2.78079 0.109652 0.776617C-0.0915146 0.576199 0.00906752 0.275573 0.210234 0.0751557C0.4114 -0.025053 0.612568 -0.025053 0.813734 0.0751557C2.62423 1.7787 4.33415 3.38204 5.94348 5.08559C6.74815 5.98747 7.55282 6.78914 8.35748 7.69102C9.16215 8.5929 9.96681 9.39457 10.6709 10.3967L9.16215 10.3967C10.6709 8.69311 12.2802 6.98956 13.8896 5.38622C15.7001 3.78288 17.41 2.17954 19.2205 0.676409C19.4216 0.475992 19.7234 0.5762 19.9246 0.776618C20.0251 0.977035 20.0251 1.17745 19.9246 1.37787Z" fill="#021B41"></path></svg>
                    </div>
                    </div>
                </div>

                {/* Dropdown menu */}
                {open && (
                    <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
                    {cardOptions.map((card, index) => (
                        <li
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer flex flex-col gap-1"
                        onClick={() => handleSelect(card)}
                        >
                        <div className={`card-logo ${card.logoClass}`} title={card.schemeName}></div>
                        <p className="personaldata text-sm">
                            <span className="card-scheme-name">{card.schemeName}</span>, ending:{' '}
                            <span className="card-ending-number">{card.ending}</span> expires:{' '}
                            <span className="card-expiry-date">{card.expiry}</span>
                            <span className="card-surcharge"> {card.surcharge}</span>
                        </p>
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        </div>
        
        <div className="transition-[padding, max-height] duration-300 py-3 max-h-auto overflow-visible visible opacity-100 filter-none space-y-8" aria-hidden="false" aria-labelledby="button--nx-id-:r9:--0" id="panel--nx-id-:r9:--0" style={{visibility: 'visible'}}>
            <div data-testid="radio-2--radio-container">
                <label htmlFor="radio-2" data-testid="radio-2--radio-label" className="flex cursor-pointer items-center space-x-2">
                    <div className="bg-white-white relative mr-2 h-6 w-6 rounded-full focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 focus-within:outline-blue-500">
                        <input id="radio-2" type="radio" name="SavedCardSupported" className="sr-only" aria-invalid="false" data-testid="radio-2--radio-input" role="radio" value="payWithAvios" checked={selectedOption === 'payWithAvios'} onChange={handleChange} />
                        <span className="absolute inset-0 rounded-full border border-grey-600"></span>
                        {selectedOption === 'payWithAvios' && (
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform" aria-hidden="true" style={{height: '18px', width: '18px', transition: '0.3s', borderRadius: '50%', backgroundColor: 'rgb(52, 104, 173)', transform: 'translate(0%, 0%)'}}></span>
                        )}
                    </div>
                    <span className="text--midnight-blue-500 select-none font-mylius-modern">
                        <span className="font-mylius-modern font-light inline-flex flex-col justify-center items-start gap-2 leading-snug text-base leading-7 text-midnight-blue-500" data-testid="text-custom--text-custom" id="text-custom">Use a new card(No fee for consumer debit or credit cards; up to £5.64 fee for corporate credit cards)</span>
                    </span>
                </label>
            </div>
        </div>
    </div>
  )
}
