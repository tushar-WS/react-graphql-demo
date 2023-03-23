import { generateApiClient } from '@utils/apiUtils';
const ituneApi = generateApiClient('itune');

export const getItunes = (artistName: any) => ituneApi.get(`/search?term=${artistName}`);
