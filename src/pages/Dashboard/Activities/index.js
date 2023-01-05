import { Typography } from '@material-ui/core';
import styled from 'styled-components';

import useActivityDates from '../../../hooks/api/useActivityDates';
import ActivitiesPageErrorMessage from '../../../components/ActivitiesPageErrorMessage/ActivitiesPageErrorMessage';
import { ActivitiesContainer } from '../../../components/ActivitiesContainer';

export default function Activities() {
  const { dates, dateError } = useActivityDates();

  return (
    <Wrapper>
      <StyledTypography variant="h4" > Escolha de atividades</StyledTypography >
      {
        !dates ? (
          <ActivitiesPageErrorMessage errorMessage={dateError?.message} />
        ) : (
          <ActivitiesContainer dates={dates} />
        )
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 37px!important;
`;
