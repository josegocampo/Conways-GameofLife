const size = {
    mobileXS: '345px',
    mobileS: '365px',
    mobileM: '375px',
    mobileL: '468px',
    tabletS: '650px',
    tablet: '700px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
  }

  export const device = {
    mobileXS:`(max-width: ${size.mobileXS})`,
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tabletS: `(max-width: ${size.tabletS})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(min-width: ${size.tablet})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
  };



  
