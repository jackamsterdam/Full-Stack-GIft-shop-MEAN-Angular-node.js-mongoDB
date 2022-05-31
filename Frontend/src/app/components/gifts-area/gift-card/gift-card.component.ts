import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GiftModel } from 'src/app/models/gift.model';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.scss']
})
export class GiftCardComponent  {

  @Input()
  gift: GiftModel

  @Output() 
  deleteMe = new EventEmitter<string>()

  deleteGift(_id: string) {
    this.deleteMe.emit(_id)
  }

}
