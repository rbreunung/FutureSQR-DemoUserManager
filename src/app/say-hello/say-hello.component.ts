import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { SayHelloService } from '../say-hello.service';

@Component({
  selector: 'app-say-hello',
  templateUrl: './say-hello.component.html',
  styleUrls: ['./say-hello.component.css']
})
export class SayHelloComponent implements OnInit {

  message: string = "World";

  constructor(private helloService: SayHelloService) { }

  ngOnInit(): void {
  }

  onPopupLocal(): void {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    const alert = (message: string, type: string) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>Hello ${message}!</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')

      if (alertPlaceholder)
        alertPlaceholder.append(wrapper);
    }

    alert(this.message, "secondary")
  }

  onPopupRemote(): void {

    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    const alert = (message: string, type: string) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>Hello ${message}!</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')

      if (alertPlaceholder)
        alertPlaceholder.append(wrapper);
    }

    this.helloService.postServerHello(this.message).pipe(first()).forEach(r => alert(r, "success"));
  }
}
