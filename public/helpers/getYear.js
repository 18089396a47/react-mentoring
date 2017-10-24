import { unknownDate } from '../constants/commons';

export default date => new Date(date).getFullYear() || 'unknown';
