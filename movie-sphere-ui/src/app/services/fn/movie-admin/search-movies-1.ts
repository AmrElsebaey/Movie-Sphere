/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseMovie } from '../../models/page-response-movie';

export interface SearchMovies1$Params {
  query: string;
  page?: number;
  size?: number;
}

export function searchMovies1(http: HttpClient, rootUrl: string, params: SearchMovies1$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseMovie>> {
  const rb = new RequestBuilder(rootUrl, searchMovies1.PATH, 'get');
  if (params) {
    rb.query('query', params.query, {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseMovie>;
    })
  );
}

searchMovies1.PATH = '/admin/movies';
