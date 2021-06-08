import { Occupation } from './occupation';
import { OccupationRating } from './occupation-rating';

export interface QuoteConfig {
    occupations: Occupation[];
    occupationRatings: OccupationRating[];
}