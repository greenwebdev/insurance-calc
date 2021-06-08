import { QuoteConfig } from './config.service';

export const mockData: QuoteConfig = {
    occupationRatings: [
        { id: 1, name: "Professional", factor: 1 },
        { id: 2, name: "White Collar", factor: 1.25 },
        { id: 3, name: "Light Manual", factor: 1.5 },
        { id: 4, name: "Heavy Manual", factor: 1.75 }
    ],
    occupations: [
        { id: 1, label: "Cleaner", ratingId: 3, ratingIndex: 2, prefix: "a" },
        { id: 2, label: "Doctor", ratingId: 1, ratingIndex: 0, prefix: "a" },
        { id: 3, label: "Author", ratingId: 2, ratingIndex: 1, prefix: "an" },
        { id: 4, label: "Farmer", ratingId: 4, ratingIndex: 3, prefix: "a" },
        { id: 5, label: "Mechanic", ratingId: 4, ratingIndex: 3, prefix: "a" },
        { id: 6, label: "Florist", ratingId: 3, ratingIndex: 2, prefix: "a" }
    ]
};