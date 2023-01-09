import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useActivityLocals() {
  const token = useToken();

  const {
    data: localsData,
    loading: localsLoading,
    error: localsError,
    act: getLocals
  } = useAsync(() => activityApi.getLocals(token));

  return {
    localsData,
    localsLoading,
    localsError,
    getLocals
  };
}
