import { useState, useEffect } from 'react'
import { useContext } from "react";
import { EcommerceContext } from "../Provider/Provider";
import detectEthereumProvider from '@metamask/detect-provider'

// dummy db
const assetStore = {
    bed: {
        price: '$999.99',
        image: 'https://naktsmebeles.lv/wp-content/uploads/2019/08/riga-gulta-slipskats-uz-balta-fona-1.jpg',
        title: 'RĪGA BED',
        description: 'WITH SLATS OR BED BOX',
        url: 'https://naktsmebeles.lv/Produkts/riga-gulta/?lang=en'
    }
}


const Modal = ({ open }) => {
  const { globalState, dispatch } = useContext(EcommerceContext);
  const [hasProvider, setHasProvider] = useState(null)
  const initialState = { accounts: [] }               /* New */
  const [wallet, setWallet] = useState(initialState)  /* New */


  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      console.log(provider)
      setHasProvider(Boolean(provider)) // transform provider to true or false
    }

    getProvider()
  }, [])

  const updateWallet = async (accounts) => {     /* New */
    setWallet({ accounts })                          /* New */
  }                                                  /* New */

  const handleConnect = async () => {                /* New */
    let accounts = await window.ethereum.request({   /* New */
      method: "eth_requestAccounts",                 /* New */
    })                                               /* New */
    updateWallet(accounts)                           /* New */
  }                                                  /* New */
return (
  <div className={` overlay animated ${open ? "show" : ""}`}>
    <div className="modal">
      <svg
        onClick={() => dispatch({
            type: "SET_WINDOW",
            id: null
          })}
        height="200"
        viewBox="0 0 200 200"
        width="200"
      >
        <title />
        <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
      </svg>
      {globalState.target &&
      <> 
      <h4>{assetStore[globalState.target].title}</h4>
      <p>{assetStore[globalState.target].description}</p>
      <img src={assetStore[globalState.target].image} /> 
      <div
      style={{
          display: 'flex',
          gap: '4px',
          justifyContent: 'space-between'
      }}
      >
      <span>{assetStore[globalState.target].price}</span>
      <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'space-between'
      }}>
    <button
      onClick={()=> {
        window.open(assetStore[globalState.target].url, '_blank').focus();
      }}
      >Buy now</button>
       {hasProvider && 
        <button onClick={handleConnect}>
        Buy with crypto
        </button>}
      </div>
      </div>
      </>}
    </div>
  </div>
)
}

export default Modal;
