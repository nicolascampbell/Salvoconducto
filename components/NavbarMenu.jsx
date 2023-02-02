import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import RotatingText from './RotatingText'
import { useRouter } from 'next/router'
import { Stack, Box, Fade } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import useMediaQuery from '@mui/material/useMediaQuery'
import Slide from '@mui/material/Slide'
import Zoom from '@mui/material/Zoom'
import Masonry from '@mui/lab/Masonry'

import {
  useTrail,
  config,
  useSpring,
  animated,
  useSpringRef
} from '@react-spring/web'
import NavbarBrand from './NavbarBrand'
export const NavbarMenu = () => {
  const [openMenu, setOpenMenu] = React.useState(false)
  const menuContainerRef = React.useRef(null)
  const navbarRef = useSpringRef()

  const [styles] = useSpring(
    () => ({
      ref: navbarRef
    }),
    []
  )

  const router = useRouter()
  const matchesSmallDevices = useMediaQuery('(max-width:768px)')
  const getLink = (path) => `${router.basePath}${path}`
  function handleOpenMenu(shouldOpen) {
    if (shouldOpen) {
      document.body.classList.add('scroll-lock')
      navbarRef.start({
        from: { background: 'transparent' },
        to: [{ background: 'var(--step1)', zIndex: 100 }],
        config: {
          mass: 2,
          friction: 20
        }
      })
    } else {
      document.body.classList.remove('scroll-lock')
      navbarRef.start({
        from: { background: 'var(--step1)' },
        to: { background: 'transparent', zIndex: 0 },
        delay: '400ms',
        config: {
          mass: 2,
          friction: 20
        }
      })
    }
    setOpenMenu(shouldOpen)
  }
  return (
    <React.Fragment>
      <Fade in={openMenu}>
        <div className="background"></div>
      </Fade>
      <Navbar bg="light" className="custom-navbar">
        <Navbar.Brand href={router.basePath} className="mx-2">
          <NavbarBrand />
        </Navbar.Brand>
        <div
          className={`menu ${openMenu ? 'isOpen' : 'isClosed'}`}
          onClick={() => handleOpenMenu(!openMenu)}
        >
          <span className="menu-title me-2 open">Menu</span>
          <span className="menu-title me-2 close">Close</span>
          <div className="menu-detail"></div>
        </div>
        <Slide direction="up" in={openMenu}>
          <Stack className="menu-socials mb-3 me-3" direction="row" spacing={1}>
            <span className="me-2">Send me an email</span>

            <a
              target="_blank"
              href="mailto:nicolasdsc@protonmail.com"
              rel="noopener noreferrer"
            >
              <AlternateEmailIcon />
            </a>
          </Stack>
        </Slide>
        <Box
          sx={{ width: matchesSmallDevices ? '100%' : '60%', maxWidth: 600 }}
          className="menu-items"
        >
          <Masonry columns={matchesSmallDevices ? 1 : 2}>
            <Zoom in={openMenu} style={{ transitionDelay: '100ms' }}>
              <Nav.Link
                style={{ height: '50%' }}
                href={getLink('/')}
                disabled={router.pathname.slice(1) === ''}
              >
                Home
              </Nav.Link>
            </Zoom>
            <Zoom in={openMenu}>
              <Nav.Link
                style={{ height: '3rem', lineHeight: 1 }}
                href={getLink('/about')}
                disabled={router.pathname.slice(1) === 'about'}
              >
                About
              </Nav.Link>
            </Zoom>
            <Zoom in={openMenu} style={{ transitionDelay: '200ms' }}>
              <Nav.Link
                href={getLink('/films')}
                disabled={router.pathname.slice(1) === 'films'}
                style={{ height: '60%' }}
              >
                Films
              </Nav.Link>
            </Zoom>
            <Zoom in={openMenu}>
              <Nav.Link
                href={getLink('/collections')}
                disabled={router.pathname.slice(1) === 'collections'}
                style={{ height: '30%' }}
              >
                Collections
              </Nav.Link>
            </Zoom>
            <Zoom in={openMenu} style={{ transitionDelay: '20ms' }}>
              <Nav.Link
                href={getLink('/misc')}
                disabled={router.pathname.slice(1) === 'misc'}
              >
                Miscellaneous
              </Nav.Link>
            </Zoom>
          </Masonry>
        </Box>
      </Navbar>
    </React.Fragment>
  )
}
export default NavbarMenu
