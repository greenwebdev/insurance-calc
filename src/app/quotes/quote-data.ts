
interface Rating {
    name: string;
    factor: number;
}

interface Occupation {
    id: number,
    label: string,
    ratingId: number,
    ratingIndex: number,
    prefix: string
}

export const ratings: Rating[] = [
    {
        name: 'Professional',
        factor: 1
    },
    {
        name: 'White Collar',
        factor: 1.25
    },
    {
        name: 'Light Manual',
        factor: 1.50
    },
    {
        name: 'Heavy Manual',
        factor: 1.75
    }
];

export const occupations: Occupation[] = [{
    id: 1,
    label: 'Cleaner',
    ratingId: 3,
    ratingIndex: 2,
    prefix: 'a'
},
{
    id: 2,
    label: 'Doctor',
    ratingId: 1,
    ratingIndex: 0,
    prefix: 'a'
},
{
    id: 3,
    label: 'Author',
    ratingId: 2,
    ratingIndex: 1,
    prefix: 'an'
},
{
    id: 4,
    label: 'Farmer',
    ratingId: 4,
    ratingIndex: 3,
    prefix: 'a'
},
{
    id: 5,
    label: 'Mechanic',
    ratingId: 4,
    ratingIndex: 3,
    prefix: 'a'
},
{
    id: 6,
    label: 'Florist',
    ratingId: 3,
    ratingIndex: 2,
    prefix: 'a'
}];

export default {
    ratings,
    occupations
};