const initState = {
  forums: [
    {
      id: 1,
      name: '',
      genres: [
        {title: '', subtitle: '', topics_id: '1'},
      ]
   }
  ]
}

const forumsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_TOPIC':
      console.log('created topic', action.topic)
      return state
    case 'CREATE_TOPIC_ERROR':
      console.log('Create topic error', action.error)
      return state
    case 'CREATE_COMMENT':
      console.log('created comment', action.comment)
      return state
    case 'CREATE_COMMENT_ERROR':
      console.log('Create comment error', action.error)
      return state
    case 'DELETE_COMMENT':
      console.log('Delete comment', action.comment)
      return state
    case 'DELETE_COMMENT_ERROR':
      console.log('Delete comment error', action.error)
      return state
    case 'FLAG_COMMENT':
      console.log('Flag comment', action.flag)
      return state
    case 'FLAG_COMMENT_ERROR':
      console.log('Flag comment error', action.error)
      return state
    case 'MARK_NOTIFICATION_READ':
      console.log('Mark notification read', action.notificationId)
      return state
    case 'MARK_NOTIFICATION_READ_ERROR':
      console.log('Mark notification read error', action.error)
      return state
    case 'DELETE_TOPIC':
      console.log('Delete topic', action.topic)
      return state
    case 'DELETE_TOPIC_ERROR':
      console.log('Delete topic error', action.error)
      return state
    case 'MAKE_TOPIC_PRIVATE':
      console.log('Make topic private', action.topic)
      return state
    case 'MAKE_TOPIC_PRIVATE_ERROR':
      console.log('Make topic private error', action.error)
      return state
    case 'MOVE_TOPIC':
      console.log('Moved topic', action.topic)
      return state
    case 'MOVE_TOPIC_ERROR':
      console.log('Move topic error', action.error)
    return state
    case 'DELETE_FORUM':
      console.log('Delete forum', action.genre)
      return state
    case 'DELETE_FORUM_ERROR':
      console.log('Delete forum error', action.error)
      return state
    case 'DELETE_SECTION':
      console.log('Delete section', action.section)
      return state
    case 'DELETE_SECTION_ERROR':
      console.log('Delete section error', action.error)
      return state
    case 'CREATE_GENRE':
      console.log('created genre', action.genre)
      return state
    case 'CREATE_GENRE_ERROR':
      console.log('Create genre error', action.error)
      return state
    case 'CREATE_SECTION':
      console.log('created section', action.section)
      return state
    case 'CREATE_SECTION_ERROR':
      console.log('Create section error', action.error)
      return state
    case 'UPDATE_SECTION_INDEX':
      console.log('Updated section index', action.section)
      return state
    case 'UPDATE_SECTION_INDEX_ERROR':
      console.log('Update section index error', action.error)
      return state
    case 'UPDATE_FORUM_INDEX':
      console.log('Updated forum index', action.genre)
      return state
    case 'UPDATE_FORUM_INDEX_ERROR':
      console.log('Update forum index error', action.error)
      return state
    case 'UPDATE_VIEWS':
      console.log('Updated views', action.view)
      return state
    case 'UPDATE_VIEWS_ERROR':
      console.log('Update views error', action.error)
      return state
    case 'ADD_UPVOTE':
      console.log('Added upvote', action.vote)
      return state
    case 'ADD_UPVOTE_ERROR':
      console.log('Add upvote error', action.error)
      return state
    case 'EDIT_COMMENT':
      console.log('Edited comment', action.comment)
      return state
    case 'EDIT_COMMENT_ERROR':
      console.log('Edit comment error', action.error)
      return state
    case 'CREATE_REPLY':
      console.log('Created reply', action.comment)
      return state
    case 'CREATE_REPLY_ERROR':
      console.log('Create reply error', action.error)
      return state
    default:
      console.log('Unknown forum action', action)
      return state
  }
}
export default forumsReducer