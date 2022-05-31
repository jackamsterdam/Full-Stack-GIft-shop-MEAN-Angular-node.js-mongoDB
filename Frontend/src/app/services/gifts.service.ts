import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GiftModel } from '../models/gift.model';
import { TargetModel } from '../models/target.model';

@Injectable({
  providedIn: 'root'
})
export class GiftsService {

  constructor(private http: HttpClient) { }

  async getAllTargets():Promise<TargetModel[]>{
    const targets = await firstValueFrom(this.http.get<TargetModel[]>(environment.targetsUrl))
    return targets 
  }

  async  getGiftsByTarget(targetId: string):Promise<GiftModel[]> {
   const gifts =  await firstValueFrom(this.http.get<GiftModel[]>(environment.giftsByTargetsUrl + targetId))
   return gifts 

  }


  async addGift(gift: GiftModel):Promise<GiftModel> {
   const addedGift = await firstValueFrom(this.http.post<GiftModel>(environment.giftsUrl, gift))
   return addedGift
}

async  deleteGift(_id: string):Promise<void> {
  await firstValueFrom(this.http.delete(environment.giftsUrl + _id))
}


}
