import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_BASE_URL } from '../config';

export interface Occupation {
    id: number;
    label: string;
    ratingId: number;
    ratingIndex: number;
    prefix: string;
}

export interface OccupationRating {
    id: number;
    name: string;
    factor: number;
}

export interface QuoteConfig {
    occupations: Occupation[];
    occupationRatings: OccupationRating[];
}

@Injectable()
export class ConfigService {
    apiUrl = `${API_BASE_URL}/config`;

    constructor(
        private http: HttpClient) {
    }

    // GET: get config from the server
    getQuoteConfig(): Observable<QuoteConfig> {
        return this.http.get<QuoteConfig>(this.apiUrl);
    }
}