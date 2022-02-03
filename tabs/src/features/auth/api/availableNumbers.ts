import { useQuery } from 'react-query';

import { axios } from '../../../lib/axios';
import { QueryConfig } from '../../../lib/react-query';

export const getAvailableNumbers = ({
  state,
  area,
}: {
  state: string;
  area: string;
}): Promise<string[]> => {
  return axios.get(`/numbers/available/${state}/${area}`);
};

type UseAvailableNumbersOptions = {
  state: string;
  area: string;
  config?: QueryConfig<typeof getAvailableNumbers>;
};

export const useAvailableNumbers = ({ state, area }: UseAvailableNumbersOptions) => {
  return useQuery({
    queryKey: ['availableNumbers', state, area],
    queryFn: () => getAvailableNumbers({ state, area }),
  });
};
