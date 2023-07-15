import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../models/user.model';

@Pipe({
  name: 'imageUser'
})
export class ImageUserPipe implements PipeTransform {

  transform( userImage: User ) {
    if( !userImage.image ) {
      return `assets/img/no-image.png`;
    }
    else{
      return userImage.image;
    }
  }
}
