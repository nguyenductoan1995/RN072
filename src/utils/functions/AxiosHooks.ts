import {useEffect, useState, useRef, useCallback} from 'react';
import {request} from './Request';

export function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const toObjectKeys = (data = []) => {
  const result = {};
  data?.forEach(item => (result[item?.id] = true));
  return result;
};

interface props {
  url?: string;
  params?: any;
  query?: any;
  success?: (value?: any) => void;
  failure?: (value?: any) => void;
  ignoreResponse?: boolean;
  callback?: (value?: any) => void;
}

interface Props {
  url?: string;
  method?: string;
  fetchOnMount?: boolean;
}

type DoRequest = (value?: any) => void;
type DoSetState = (value?: any) => void;

const useRequest = ({url, method = 'get', fetchOnMount}: Props) => {
  const [requestState, setRequestState] = useState({
    data: null,
    isLoading: false,
    isSuccess: false,
    message: '',
  });
  const prevLoading = usePrevious(requestState.isLoading);

  const doRequest: DoRequest = ({
    url: altUrl,
    params,
    query,
    success,
    failure,
    ignoreResponse,
    callback,
  }: props = {}) => {
    setRequestState(prevState => ({
      ...prevState,
      isLoading: true,
      isSuccess: false,
    }));
    request({
      url: url || altUrl || '',
      method,
      params,
      query,
      success: result => {
        if (ignoreResponse) return;
        setRequestState(prevState => ({
          ...prevState,
          data: result,
          isLoading: false,
          isSuccess: true,
        }));
        if (typeof success === 'function') {
          success(result);
        }
        if (typeof callback === 'function') {
          callback(result);
        }
      },
      failure: result => {
        console.log('[call api fail failure]', result);
        if (ignoreResponse) return;
        setRequestState(prevState => ({
          ...prevState,
          isLoading: false,
          isSuccess: false,
          message: result,
        }));
        if (typeof failure === 'function') {
          failure(result);
        }
      },
    });
  };

  const _doSetState: DoSetState = (_params: any) => {
    setRequestState(prev => ({...prev, ..._params}));
  };

  useEffect(() => {
    if (fetchOnMount) {
      doRequest();
    }
  }, []);

  return [requestState, doRequest, prevLoading, _doSetState];
};

const usePaging = (
  API: string,
  defaultQuery = {
    //  perPage: 10  | TODO
  },
) => {
  const [data, setData] = useState<any>([]);
  const [subData, setSubData] = useState({});
  const [pagingState, setPagingState] = useState({
    isFetching: false,
    isRefreshing: false,
    totalPage: 0,
    currentPage: 0,
  });
  const [query, setQuery] = useState(defaultQuery);

  const setWithPreviousState = (state: any) =>
    setPagingState(prevPagingState => ({
      ...prevPagingState,
      ...state,
    }));

  const fetch = useCallback(
    (page = 1) => {
      if (
        (page === 1 || page > pagingState.currentPage) &&
        !pagingState.isFetching
      ) {
        setWithPreviousState({isFetching: true});
        request({
          method: 'get',
          url: API,
          query: {
            ...query,
            // page | TODO
          },
          success: response => {
            console.log('[paging response]', response);
            const {totalPage, list, ...res} = response.data;
            setWithPreviousState({
              isFetching: false,
              currentPage: page,
              totalPage,
            });
            setSubData({...res});
            if (page === 1) {
              setData(list);
            } else {
              const ids = toObjectKeys(list);
              setData((prevData: any) => [
                ...prevData.filter(item => !ids[item.id]),
                ...list,
              ]);
            }
          },
          failure: e => {
            console.log('[failure]', e);
            setWithPreviousState({isFetching: false});
          },
        });
      }
    },
    [API, pagingState.currentPage, pagingState.isFetching, query],
  );

  const fetchMore = useCallback(() => {
    if (
      pagingState.currentPage !== 0 &&
      !pagingState.isFetching &&
      !pagingState.isRefreshing &&
      pagingState.currentPage < pagingState.totalPage - 1
    ) {
      fetch(pagingState.currentPage + 1);
    }
  }, [fetch, pagingState]);

  const refresh = useCallback(
    (silent = false) => {
      if (!silent) setWithPreviousState({isRefreshing: true});
      request({
        method: 'get',
        url: API,
        query,
        success: response => {
          const {totalPage, list, ...res} = response.data;
          console.log('[paging response refresh]', response);

          setWithPreviousState({
            isRefreshing: false,
            totalPage,
          });
          setSubData({...res});
          const ids = toObjectKeys(list);
          if (!list?.length) {
            setData([]);
          }
          setData(prevData => [
            ...list,
            ...prevData.filter(item => !ids[item.id]),
          ]);
        },
        failure: () => {
          setWithPreviousState({isRefreshing: false});
        },
      });
    },
    [API, query],
  );

  useEffect(() => {
    fetch();
  }, [query]);

  return [
    data,
    pagingState.isFetching,
    pagingState.isRefreshing,
    fetch,
    fetchMore,
    refresh,
    setQuery,
    subData,
  ];
};

export {useRequest, usePaging};
