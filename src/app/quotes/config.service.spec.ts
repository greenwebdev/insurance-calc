import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ConfigService, QuoteConfig } from './config.service';
import { API_BASE_URL } from '../config';
import { mockData } from './config.mock-data';

describe('HttpClient testing', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let service: ConfigService;
    const apiUrl = `${API_BASE_URL}/config`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ConfigService]
        });

        // Inject the http service and test controller for each test
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(ConfigService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('#getQuoteConfig should return expected data', (done) => {
        const expectedData: QuoteConfig = mockData;

        service.getQuoteConfig().subscribe(data => {
            expect(data).toEqual(expectedData);
            done();
        });

        const testRequest = httpTestingController.expectOne(apiUrl);

        testRequest.flush(expectedData);
    });

    it('#getQuoteConfig should use GET to retrieve data', () => {
        service.getQuoteConfig().subscribe();

        const testRequest = httpTestingController.expectOne(apiUrl);

        expect(testRequest.request.method).toEqual('GET');
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });
});