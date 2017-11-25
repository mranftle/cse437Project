import {Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router';
import {BetService} from "../services/bet.service";
import {Bet} from "../entities/bet";
import {AuthService} from "../services/auth.service";
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'profile',
  templateUrl: '../templates/profile.component.html',
  styleUrls: ['../stylesheets/profile.component.css'],
})

export class ProfileComponent implements OnInit {
  closeResult: string;
  bets: Bet[];
  constructor(private router: Router,
              private betService: BetService,
              private authService: AuthService, private modalService:NgbModal){}
  goHome(){
    this.router.navigateByUrl('/main');
  }
  gotoProfile(){
    this.router.navigateByUrl('/main/profile');
  }
  gotoSports(){
    this.router.navigateByUrl('/main/sportsgame');
  }
  gotoFriends(){
    this.router.navigateByUrl('/main/friends');
  }
  gotoCharities(){
    this.router.navigateByUrl('/main/charities');
  }
  acceptBet(bet_id:number) {
    this.betService.acceptBet(bet_id);
  }

  getBets() {
    this.betService.getBets().then(
      (bets) => {
        this.bets = bets.map(function(obj) {
          let b = new Bet();
          console.log(obj);
          b.home_team_abb = obj.home_team_abb;
          b.away_team_abb = obj.away_team_abb;
          b.home_score = obj.home_score;
          b.away_score = obj.away_score;
          b.completed = obj.completed;
          return b;
        });
      }
    );
    console.log(this.bets);
  }
  logout(){
    this.authService.logout()
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
    this.getBets();
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
