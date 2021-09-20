import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish ;
  promotion: Promotion;
  leader: Leader;

  constructor(private dishService: DishService, private promotionService: PromotionService, private leaderService: LeaderService) { }

  ngOnInit() {
   this.dishService.getDish("0").then((data) => this.dish = data);
   this.promotionService.getPromotion("0").then((data) => this.promotion = data);
   this.leaderService.getLeader("0").then((data) => this.leader = data);

  }

}
