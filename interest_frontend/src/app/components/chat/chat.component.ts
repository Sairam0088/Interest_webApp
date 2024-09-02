import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userName: string | null = null;
  chats: any[] = [];
  selectedChatId: number | null = null;
  messages: any[] = [];
  newMessage: string = '';
  userToChatWith: number | null = null;
  private isBrowser: boolean;

  constructor(private authService: AuthService, private chatService: ChatService, @Inject(PLATFORM_ID) private platformId: Object
) {
  this.isBrowser = isPlatformBrowser(this.platformId);
}

ngOnInit(): void {
  if (this.isBrowser) {
  this.authService.getCurrentUser().subscribe({
    next: (user:any) => {
      this.userName = user.results.username;
      },
    error: (error: HttpErrorResponse) => {
      console.error('Error fetching user details', error.message);
    }
    });
  this.chatService.getChats().subscribe({
    next: data => {
      this.chats = Array.isArray(data.results) ? data.results : [];
    },
    error: error => {
      console.error('Error fetching chats:', error);
      this.chats = [];
    }
  });
}
}



  createChat(user2: number): void {
    this.chatService.createChat(user2).subscribe({
      next: data => {
        console.log('Chat created:', data);
        this.chats.push(data);
      },
      error: error => {
        console.error('Error creating chat:', error);
      }
  });
  }

  selectChat(chatId: number): void {
    this.selectedChatId = chatId;
    this.chatService.getMessages(chatId).subscribe({
      next: data => {
        this.messages = Array.isArray(data.results) ? data.results : [];
        console.log(this.messages)
      },
      error: error => {
        console.error('Error fetching messages:', error);
        this.messages = [];
      }
  });
  }

  sendMessage(): void {
    if (this.selectedChatId && this.newMessage.trim()) {
      this.chatService.sendMessage(this.selectedChatId, this.newMessage).subscribe(() => {
        this.messages.push({ content: this.newMessage, sender:'You' });
        this.newMessage = '';
      });
    }
  }
}
