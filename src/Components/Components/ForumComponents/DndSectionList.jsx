import React, { useState, useCallback } from 'react'
import Card from './Card'
import update from 'immutability-helper'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const style = {
  width: 300,
  marginTop: '10px',
}
const SectionContainer = ({forum}) => {
  {
    // (my edit) the following builds an array of objects each containing information about a forum section
    console.log("Forums", forum)

    var stateArray = forum && forum.map(section => ({
      doc_id: section.id,
      title: section.title,
    }))

    const [cards, setCards] = useState(stateArray)

    const moveCard = useCallback(
      (dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex]
        setCards(
          update(cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
        )
      },
      [cards],
    )
    const renderCard = (card, index) => {
      return (
        <Card
          key={card.doc_id}
          index={index}
          id={card.doc_id}
          text={card.title}
          moveCard={moveCard}
        />
      )
    }
    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    )
  }
}
export default compose(
  firestoreConnect((props) => ['forum']),
  connect((state, props) => ({
    forum: state.firestore.ordered.forum
  }))
)(SectionContainer)
