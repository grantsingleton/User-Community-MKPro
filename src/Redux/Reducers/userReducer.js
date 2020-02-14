const initState = {}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_BOS':
      console.log('Update BOS', action.user)
      return state
    case 'UPDATE_BOS_ERROR':
      console.log('Update BOS error', action.error)
      return state
    case 'UPDATE_JOB_RANK':
        console.log('Update job and rank', action.user)
        return state
      case 'UPDATE_JOB_RANK_ERROR':
        console.log('Update job and rank error', action.error)
        return state
    default:
      console.log('Unknown user action', action)
      return state
  }
}

export default userReducer