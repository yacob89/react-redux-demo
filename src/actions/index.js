import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

// Action Creator
// Solution #2
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // Complete function
  /* const userIds = _.uniq(_.map(getState().posts, 'userId'));
  userIds.forEach(id => dispatch(fetchUser(id))); */

  // Refactor version
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');
  // Return an action
  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

// Solution #1
// Use this method to fetch only one time multiple requests! Lodash memoize
// Not recommended if you have to refresh new list inside app
/* export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: 'FETCH_USER', payload: response.data });
}); */

// Solution #2
export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: 'FETCH_USER', payload: response.data });
};
