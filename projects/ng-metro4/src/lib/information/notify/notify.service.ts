import { Injectable } from '@angular/core';

interface NotifySetupOptions {
  container?: string;
  width?: string;
  timeout?: number;
  duration?: number;
  distance?: string;
  animation?: string;
}

interface NotifyOptions {
  keepOpen?: boolean;
  cls?: string;
  width: string;
  onShow?: () => void;
  onClose?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

  public setup(options: NotifySetupOptions) {
    (<any>window).Metro.notify.setup(options);
  }

  public reset() {
    (<any>window).Metro.notify.reset();
  }

  public create(message: string, title?: string, options?: NotifyOptions) {
    (<any>window).Metro.notify.create(message, title, options);
  }
}
