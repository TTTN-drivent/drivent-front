import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useActivities() {
  const token = useToken();

  const {
    data: activitiesData,
    loading: activitiesLoading,
    error: activitiesError,
    act: activitiesHotels
  } = useAsync(() => activitiesApi.list(token));

  return {
    activitiesData,
    activitiesLoading,
    activitiesError,
    activitiesHotels
  };
}
