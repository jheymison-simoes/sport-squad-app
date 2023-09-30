import { ActivatedRoute } from "@angular/router";

declare module '@angular/router' {
  interface ActivatedRoute {
    getParam<T>(this: ActivatedRoute, param: string): T;
  }
}

ActivatedRoute.prototype.getParam = function<T> (this: ActivatedRoute, param: string): T {
  let value = this.snapshot.paramMap.get(param);
  return value as unknown as T;
}
