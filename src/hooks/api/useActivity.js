import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useActivity(id) {
  const token = useToken();

  const {
    data: activity,
    loading: activityLoading,
    error: activityError,
    act: getActivity
  } = useAsync(() => activityApi.getActivities(id, token));

  return {
    activity,
    activityLoading,
    activityError,
    getActivity
  };
}
