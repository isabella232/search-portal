import React from 'react'
import { withStyles } from '@material-ui/styles'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import CheckIcon from '@material-ui/icons/Check'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import MuiToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

const buttonStyle = {
  padding: '0',
  borderRadius: '20px',
  height: '32px',
  borderWidth: '0',
  backgroundColor: '#FFFFFF',
}

const selectedButtonStyle = {
  padding: '0',
  borderRadius: '20px',
  height: '32px',
  borderWidth: '0',
  backgroundColor: 'rgb(252, 235, 242)',
}

const selectedChipStyle = {
  margin: '0',
  borderRadius: '20px',
}

const toggleButtonGroupStyle = {
  backgroundColor: 'transparent',
}

const ToggleButton = withStyles({
  label: {
    backgroundColor: 'transparent',
  },
})(MuiToggleButton)

const GeneList = props => {
  const results = props.search.searchResults
  const hits = props.network.hitGenes
  const hitSets = new Set(hits)

  const handleChange = (event, newAlignment) => {
    if (newAlignment in props.geneToNodeMap) {
      const alignment = props.geneToNodeMap[newAlignment]
      if (alignment === props.search.selectedGenes[0]) {
        props.searchActions.clearSelectedGenes()
      } else {
        props.searchActions.setSelectedGenes(alignment)
      }
    } else {
      if (newAlignment === props.search.selectedGenes[0]) {
        props.searchActions.clearSelectedGenes()
      } else {
        props.searchActions.setSelectedGenes(newAlignment)
      }
    }
  }

  if (!results) {
    return <div className="gene-list-wrapper" />
  }


  const queryGeneList = results.query

  if (!queryGeneList) {
    return <div className="gene-list-wrapper" />
  }

  const matched = []
  const unmatched = []

  const unique = new Set()
  for (const gene of queryGeneList) {
    unique.add(gene)
  }

  for (const value of unique) {
    if (hitSets.has(value.toUpperCase())) {
      matched.push(value.toUpperCase())
    } else {
      unmatched.push(value.toUpperCase())
    }
  }

  const matchedSorted = matched.sort()
  const unmatchedSorted = unmatched.sort()
  const sorted = [...matchedSorted, ...unmatchedSorted]

  return (
    <div className="gene-list-wrapper">
      <List>
        {sorted.map(geneValue => (
          <ListItem key={geneValue}>
            <ToggleButtonGroup
              value={props.search.selectedGenes}
              exclusive
              onChange={handleChange}
              style={toggleButtonGroupStyle}
            >
              <ToggleButton
                value={geneValue}
                style={
                  hitSets.has(geneValue) && props.search.selectedGenes[0] === geneValue
                    ? selectedButtonStyle
                    : buttonStyle
                }
              >
                {getChip(geneValue, hitSets)}
              </ToggleButton>
            </ToggleButtonGroup>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

const getChip = (value, hitSets) => {
  if (hitSets.has(value.toUpperCase())) {
    return (
      <Chip
        label={value}
        variant="outlined"
        color={'secondary'}
        key={value}
        selected
        style={selectedChipStyle}
        clickable={true}
      />
    )
  } else {
    return (
      <Chip
        label={value}
        variant="outlined"
        color={'default'}
        key={value}
        selected
        style={selectedChipStyle}
        clickable={false}
      />
    )
  }
}

export default GeneList
