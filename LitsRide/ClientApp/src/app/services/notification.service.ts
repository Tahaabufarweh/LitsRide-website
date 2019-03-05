import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class NotificationService {

  constructor(private _notifications: NotificationsService) {

  }

  createNotificationService(type  , title , content) {
   let notifyConfig = {
     timeOut: 5000,
     showProgressBar: true,
     pauseOnHover: true,
     clickToClose: true,
     animate: 'fromRight'
    }

    this._notifications.create(title, content, type, notifyConfig);
  }
}
