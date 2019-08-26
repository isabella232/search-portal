import React from 'react'
import { makeStyles } from '@material-ui/styles'

import TableBrowserPanel from './TableBrowserPanel'


const useStyles = makeStyles(theme => ({
  container: {
    padding: '0.2em',
    backgroundColor: '#FFFFFF',
    overflow: 'auto'
  },
  list: {

  },
  subtitle: {
    marginLeft: '1em',
    marginTop: '0.5em'
  }
}))

const DISABLED_STYLE = {
  width: '100%'
}
/**
 *
 * Basic property viewer for nodes and edges
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const TableBrowser = props => {
  const classes = useStyles()
  const network = props.network

  if (network === null) {
    return <div style={DISABLED_STYLE} />
  }

  const { originalCX } = network
  if (originalCX === null) {
    return <div style={DISABLED_STYLE} />
  }

  return (
    <div className={'table-browser'}>
      <TableBrowserPanel
        network={props.network}
        networkActions_changeTab={props.networkActions_changeTab}

        search_results={props.search_results}
      />
    </div>
  )
  
}

export default TableBrowser
