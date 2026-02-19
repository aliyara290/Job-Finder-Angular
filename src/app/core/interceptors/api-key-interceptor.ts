import { HttpInterceptorFn } from '@angular/common/http';
import {environments} from '../../../environments/environement.dev';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const ApiKey = environments.JOBS_API_KEY;
  const userAgent = environments.JOBS_USER_AGENT;
  const RemoteBackendApi = environments.REMOTE_BACKEND_API;

  if(ApiKey && req.url.includes(RemoteBackendApi)){
    req = req.clone({
      setHeaders: {
        'Authorization-Key': ApiKey,
        'User-Agent': userAgent
      }
    })
  }
  return next(req);
};
