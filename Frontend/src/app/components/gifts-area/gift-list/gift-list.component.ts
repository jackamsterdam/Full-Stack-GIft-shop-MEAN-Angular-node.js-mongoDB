import { GiftsService } from './../../../services/gifts.service';
import { Component, OnInit } from '@angular/core';
import { TargetModel } from 'src/app/models/target.model';
import { NotifyService } from 'src/app/services/notify.service';
import { GiftModel } from 'src/app/models/gift.model';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.scss']
})
export class GiftListComponent implements OnInit {
  targets: TargetModel[]
  gifts: GiftModel[]
  constructor(private giftsService: GiftsService, private notify: NotifyService) { }

  async ngOnInit() {
    try {
      this.targets = await this.giftsService.getAllTargets()

    } catch (err: any) {
      this.notify.error(err)
    }
  }

  async getGifts(event: Event) {
    try {
      const targetId = (event.target as HTMLSelectElement).value
      this.gifts = await this.giftsService.getGiftsByTarget(targetId)
    } catch (err: any) {
      this.notify.error(err)
    }

  }

  async deleteThisCard(_id: string) {
   try {
     const ok = confirm('Are you sure?')
     if (!ok) return 
     await this.giftsService.deleteGift(_id)
     this.notify.success('Gift has been deleted')
     const indexToDelete = this.gifts.findIndex(g => g._id === _id)
     this.gifts.splice(indexToDelete, 1)
   } catch (err: any) {
     this.notify.error(err)
   }
  }

}
