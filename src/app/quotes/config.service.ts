import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { QuoteConfig } from './quote-config';
import { API_BASE_URL } from '../config';

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