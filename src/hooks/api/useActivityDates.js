import useAsync from '../useAsync';
import useToken from '../useToken';

import * as dateApi from '../../services/activityApi';
import dayjs from 'dayjs';

export default function useActivityDates() {
  const token = useToken();

  const {
    data: datesData,
    loading: dateLoading,
    error: dateError,
    act: getDates
  } = useAsync(() => dateApi.getDates(token));

  const dates = datesData?.map((date) => {
    return {
      ...date,
      date: dayjs(date.date).format('DD/MM').toString()
    };
  });

  return {
    dates,
    dateLoading,
    dateError,
    getDates
  };
}
