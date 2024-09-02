import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { InterestsService } from '../../services/interests.service';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  interests: any[] = [];
  sentInterests: any[] = [];
  selectedUserId: string = '';
  interestMessage: string = '';
  displayModal: boolean = false;
  private isBrowser: boolean;

  constructor(
    private usersService: UsersService,
    private interestsService: InterestsService,
    private chatsService: ChatService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadUsers();
      this.loadInterests();
    }
  }
  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: data => {
        if (Array.isArray(data.results)) {
          this.users = data.results;
        } else {
          console.error('Expected an array for users but got:', data.results);
        }
      },
      error: error => console.error('Error loading users', error)
    });
  }

  loadInterests() {
    this.interestsService.getInterests().subscribe({
      next: data => {
        if (Array.isArray(data.results)) {
          this.interests = data.results;
        } else {
          console.error('Expected an array for interests but got:', data.results);
        }
      },
      error: error => console.error('Error loading interests', error)
    });
  }

  loadSentInterests() {
    this.interestsService.getSentInterests().subscribe({
      next: data => {
        if (Array.isArray(data.results)) {
          this.sentInterests = data.results;
          console.log(data.results)
        } else {
          console.error('Expected an array for interests but got:', data.results);
        }
      },
      error: error => console.error('Error loading interests', error)
    });
  }

  openSendInterestModal(userId: string) {
    this.selectedUserId = userId;
    this.displayModal = true;
  }
  sendInterest() {
    if (this.selectedUserId && this.interestMessage.trim()) {
      this.interestsService.sendInterest(this.selectedUserId, this.interestMessage).subscribe({
        next: response => {
          console.log('Interest sent', response);
          this.loadInterests();
          this.displayModal = false;
          this.interestMessage = '';
        },
        error: error => {
          console.error('Error sending interest', error);
        }
      });
    } else {
      console.error('User ID or message is missing');
    }
  }

  acceptInterest(interestId: string, user2Id: number) {
    this.interestsService.acceptInterest(interestId).subscribe({
      next: response => {
        console.log('Interest accepted', response);
        this.loadInterests();
        this.chatsService.createChat(user2Id).subscribe({
          next: chatResponse => {
            console.log('Chat created successfully:', chatResponse);
            // Optionally, redirect to the chat page
            this.router.navigate(['/chat', chatResponse.id]);
          },
          error: chatError => {
            console.error('Error creating chat:', chatError);
          }
      });
    },
      error: error => console.error('Error accepting interest', error)
    });
  }

  rejectInterest(interestId: string) {
    this.interestsService.rejectInterest(interestId).subscribe({
      next: response => {
        console.log('Interest rejected', response);
        this.loadInterests();
      },
      error: error => console.error('Error rejecting interest', error)
    });
  }
}
