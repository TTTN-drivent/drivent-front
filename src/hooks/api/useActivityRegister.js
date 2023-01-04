import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useActivityRegister() {
  const token = useToken();

  const {
    data: activityRegisterData,
    loading: activityRegisterLoading,
    error: activityRegisterError,
    act: getActivityRegister
  } = useAsync((activityId) => activityApi.getActivityRegister(activityId, token), false);

  return {
    activityRegisterData,
    activityRegisterLoading,
    activityRegisterError,
    getActivityRegister
  };
}
