import {usePaging, useRequest} from '../utils/functions/AxiosHooks';

const useHome = () => {
  const [state, doRequest, prevLoading, _doSetState] = useRequest({
    url: '/home',
  });

  const _doRequest = (params?: any) => {
    if (typeof doRequest === 'function') {
      doRequest({
        params,
      });
    }
  };

  return {state, doRequest: _doRequest, prevLoading, doSetState: _doSetState};
};

const useEarnedPaging = (defaultQuery = {}) => {
  return usePaging('REWARD_EARNED', defaultQuery);
};

const useEarnedById = () => {
  const [state, doRequest] = useRequest({});

  const _doRequest = (id?: any, query = {}) => {
    if (typeof doRequest === 'function') {
      doRequest({
        url: 'API.HOME.REWARD_EARNED_ID'.replace(':id', id),
        query,
      });
    }
  };

  return {
    isLoading: state?.isLoading,
    isSuccess: state?.isSuccess,
    data: state?.data?.data || [],
    _doRequest,
  };
};

export {useHome, useEarnedPaging, useEarnedById};
