import { createContext, useContext, useReducer, useMemo, ReactNode } from 'react'

// Define the type for the state
interface State {
  miniSidenav: boolean
  transparentSidenav: boolean
  whiteSidenav: boolean
  sidenavColor: string
  transparentNavbar: boolean
  fixedNavbar: boolean
  openConfigurator: boolean
  direction: 'ltr' | 'rtl'
  layout: 'dashboard' | 'otherLayout' // Adjust otherLayout as necessary
  darkMode: boolean
}

// Define action types
type ActionType =
  | 'MINI_SIDENAV'
  | 'TRANSPARENT_SIDENAV'
  | 'WHITE_SIDENAV'
  | 'SIDENAV_COLOR'
  | 'TRANSPARENT_NAVBAR'
  | 'FIXED_NAVBAR'
  | 'OPEN_CONFIGURATOR'
  | 'DIRECTION'
  | 'LAYOUT'
  | 'DARKMODE'

// Define the type for the action
interface Action {
  type: ActionType
  value: boolean | string // Adjust based on your use case
}

// Material Dashboard 2 React main context
const MaterialUI = createContext<[State, React.Dispatch<Action>]>(
  undefined as unknown as [State, React.Dispatch<Action>]
)

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = 'MaterialUIContext'

// Material Dashboard 2 React reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'MINI_SIDENAV':
      return { ...state, miniSidenav: action.value as boolean }
    case 'TRANSPARENT_SIDENAV':
      return { ...state, transparentSidenav: action.value as boolean }
    case 'WHITE_SIDENAV':
      return { ...state, whiteSidenav: action.value as boolean }
    case 'SIDENAV_COLOR':
      return { ...state, sidenavColor: action.value as string }
    case 'TRANSPARENT_NAVBAR':
      return { ...state, transparentNavbar: action.value as boolean }
    case 'FIXED_NAVBAR':
      return { ...state, fixedNavbar: action.value as boolean }
    case 'OPEN_CONFIGURATOR':
      return { ...state, openConfigurator: action.value as boolean }
    case 'DIRECTION':
      return { ...state, direction: action.value as 'ltr' | 'rtl' }
    case 'LAYOUT':
      return { ...state, layout: action.value as 'dashboard' | 'otherLayout' } // Adjust as necessary
    case 'DARKMODE':
      return { ...state, darkMode: action.value as boolean }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

// Material Dashboard 2 React context provider
interface MaterialUIControllerProviderProps {
  children: ReactNode
}

function MaterialUIControllerProvider({ children }: MaterialUIControllerProviderProps) {
  const initialState: State = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: 'info',
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: 'ltr',
    layout: 'dashboard',
    darkMode: false
  }

  const [controller, dispatch] = useReducer(reducer, initialState)

  // Ensure that the value is always a tuple
  const value = useMemo(
    () => [controller, dispatch] as [State, React.Dispatch<Action>],
    [controller, dispatch]
  )

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>
}

// Material Dashboard 2 React custom hook for using context
function useMaterialUIController(): [State, React.Dispatch<Action>] {
  const context = useContext(MaterialUI)

  if (!context) {
    throw new Error(
      'useMaterialUIController should be used inside the MaterialUIControllerProvider.'
    )
  }

  return context
}

// Context module functions
const setMiniSidenav = (dispatch: React.Dispatch<Action>, value: boolean) =>
  dispatch({ type: 'MINI_SIDENAV', value })
const setTransparentSidenav = (dispatch: React.Dispatch<Action>, value: boolean) =>
  dispatch({ type: 'TRANSPARENT_SIDENAV', value })
const setWhiteSidenav = (dispatch: React.Dispatch<Action>, value: boolean) =>
  dispatch({ type: 'WHITE_SIDENAV', value })
const setSidenavColor = (dispatch: React.Dispatch<Action>, value: string) =>
  dispatch({ type: 'SIDENAV_COLOR', value })
const setTransparentNavbar = (dispatch: React.Dispatch<Action>, value: boolean) =>
  dispatch({ type: 'TRANSPARENT_NAVBAR', value })
const setFixedNavbar = (dispatch: React.Dispatch<Action>, value: boolean) =>
  dispatch({ type: 'FIXED_NAVBAR', value })
const setOpenConfigurator = (dispatch: React.Dispatch<Action>, value: boolean) =>
  dispatch({ type: 'OPEN_CONFIGURATOR', value })
const setDirection = (dispatch: React.Dispatch<Action>, value: 'ltr' | 'rtl') =>
  dispatch({ type: 'DIRECTION', value })
const setLayout = (dispatch: React.Dispatch<Action>, value: 'dashboard' | 'otherLayout') =>
  dispatch({ type: 'LAYOUT', value })
const setDarkMode = (dispatch: React.Dispatch<Action>, value: boolean) =>
  dispatch({ type: 'DARKMODE', value })

export {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode
}
