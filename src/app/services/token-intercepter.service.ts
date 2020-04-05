import { Injectable } from '@angular/core';

import { HttpInterceptor } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService  implements HttpInterceptor{

 obj:any =environment.headers;


  constructor() { }
  intercept(req,next){
  	let tokenizedReq = req.clone({
  		setHeaders:this.obj
  	});

  	return next.handle(tokenizedReq);
  }
}
