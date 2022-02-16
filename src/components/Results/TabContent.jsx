import React from 'react'

import Ndex from './Ndex'
import LoadingPanel from '../LoadingPanel'

const TabContent = props => {
  const { results, search } = props;
  const { isFetching, searchResults } = search;

  if (results == null && (isFetching || searchResults == null)) {
    return <LoadingPanel title={'Loading results'} message={<div style={{ color: 'black' }}>Please wait...</div>} />
  } else {
    return (
      <Ndex
        hits={results.results}
        totalNetworks={results.numberOfNetworks}
        sourceUUID={results.sourceUUID}
        {...props}
      />
    )
  }
}

export default TabContent
