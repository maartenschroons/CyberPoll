import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from '../services/poll.service';
import { Poll } from '../models/poll.model';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-createpoll',
  templateUrl: './createpoll.component.html',
  styleUrls: ['./createpoll.component.scss']
})
export class CreatepollComponent implements OnInit {

  poll: Poll = new Poll(0, "", 0, "","");

  pollForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  })

  constructor(private fb: FormBuilder,private route: Router, private _pollService: PollService) { }

  ngOnInit() {
  }

  //Create a new poll
  addPoll() {
    //Get the logged in userId
    this.poll.creator= parseInt(localStorage.getItem("userId"));

    //Create the poll and go to the detail page of the poll
    this._pollService.addPoll(this.poll).subscribe(result=>{this.route.navigate(['/poll'], { state: { pollid: result.pollId } });});
    
  }


}
