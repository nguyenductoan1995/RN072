import {useRequest} from '../utils/functions/AxiosHooks';

// const useHome = () => useRequest({ url: API.HOME.REWARD_SUMMARY });

const useHome = () => {
  const [state, doRequest, prevLoading, _doSetState] = useRequest({
    url: '/home',
  });

  const _doRequest = (query?: any) => {
    if (typeof doRequest === 'function') {
      doRequest({
        query,
      });
    }
  };

  return {state, _doRequest, prevLoading, _doSetState};
};

// const useEarnedPaging = (defaultQuery = {}) => {
//   return usePaging('REWARD_EARNED', defaultQuery);
// };

// const useEarnedById = () => {
//   const [state, doRequest] = useRequest({});

//   const _doRequest = (id, query = {}) => {
//     doRequest({
//       url: 'API.HOME.REWARD_EARNED_ID'.replace(':id', id),
//       query,
//     });
//   };

//   return [state.isLoading, state.isSuccess, state.data?.data || [], _doRequest];
// };

export {
  useHome,
  //  useEarnedPaging,
  //   useEarnedById
};
