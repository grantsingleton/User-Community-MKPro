import React, { useState, useCallback } from 'react'
import ForumCard from './ForumCard'
import update from 'immutability-helper'

import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const style = {
  width: 300,
  marginTop: '10px',
}
const Container = ({genres, forum_doc_id }) => {
  {
    // (my edit) the following builds an array of objects each containing information about a forum section
    console.log("Genres", genres)


    var stateArray = genres && genres.map(genre => ({
      doc_id: genre.id,
      title: genre.title,
      index: genre.index,
    }))

    if(stateArray) {
      stateArray.sort((a,b) => (a.index > b.index) ? 1 : -1)
    }

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
        <ForumCard
          key={card.doc_id}
          index={index}
          forum_id={forum_doc_id}
          genre_id={card.doc_id}
          text={card.title}
          moveCard={moveCard}
        />
      )
    }
    if (!cards) {
      return <div/>
    }
    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    )
  }
}
export default compose(
  firestoreConnect((props) => [
    { collection: 'forum', 
      doc: props.forum_doc_id, 
      subcollections: [{collection: 'genre'}],
      storeAs: `${props.forum_doc_id}-genre`
    }
  ]),
  connect((state, props) => ({
    genres: state.firestore.ordered[`${props.forum_doc_id}-genre`]
  }))
)(Container)
