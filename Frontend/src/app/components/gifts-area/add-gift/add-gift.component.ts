import { NotifyService } from './../../../services/notify.service';
import { Component, OnInit } from '@angular/core';
import { GiftsService } from 'src/app/services/gifts.service';
import { GiftModel } from 'src/app/models/gift.model';
import { TargetModel } from 'src/app/models/target.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-gift',
  templateUrl: './add-gift.component.html',
  styleUrls: ['./add-gift.component.scss']
})
export class AddGiftComponent implements OnInit {
  gift = new GiftModel()
  targets: TargetModel[]
  constructor(private giftsService: GiftsService, private notify: NotifyService, private router: Router) { }

  async ngOnInit() {
    try {
      this.targets = await this.giftsService.getAllTargets()
    } catch (err: any) {
      this.notify.error(err)
    }
  }

  async submit() {
  try {
    await this.giftsService.addGift(this.gift)
    this.notify.success('Gift has been added')
    this.router.navigateByUrl('/gifts')
  } catch (err: any) {
    this.notify.error(err)
  }
  }

}
