import useAsync from '../useAsync';
import useToken from '../useToken';

import * as dateApi from '../../services/activityApi';
import dayjs from 'dayjs';

function weekdayEntoPtBr(weekday) {
  switch (weekday) {
  case 'Sun':
    return 'Domingo';
  case 'Mon':
    return 'Segunda';
  case 'Tue':
    return 'Terça';
  case 'Wed':
    return 'Quarta';
  case 'Thu':
    return 'Quinta';
  case 'Fri':
    return 'Sexta';
  case 'Sat':
    return 'Sábado';
  default:
    break;
  }
}

export default function useActivityDates() {
  const token = useToken();

  const {
    data: datesData,
    loading: dateLoading,
    error: dateError,
    act: getDates
  } = useAsync(() => dateApi.getDates(token));

  const dates = datesData?.map((date) => {
    const weekday = dayjs(date.date).toString().slice(0, 3);
    const ptWeekday = weekdayEntoPtBr(weekday);
    const DDMMDate = dayjs(date.date).format('DD/MM').toString();
    const finalDate = `${ptWeekday}, ${DDMMDate}`;

    return {
      ...date,
      date: finalDate
    };
  });

  return {
    dates,
    dateLoading,
    dateError,
    getDates
  };
}
