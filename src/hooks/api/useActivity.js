import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useActivity() {
  const token = useToken();

  const {
    data: activity,
    loading: activityLoading,
    error: activityError,
    act: getActivity
  } = useAsync((id) => activityApi.getActivities(id, token), false);

  return {
    activity,
    activityLoading,
    activityError,
    getActivity
  };
}
