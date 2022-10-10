import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-say-hello',
  templateUrl: './say-hello.component.html',
  styleUrls: ['./say-hello.component.css']
})
export class SayHelloComponent implements OnInit {

  message: string = "World";

  constructor() { }

  ngOnInit(): void {
  }

  onPopupTriggered(): void {
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

    alert(this.message, "success")
  }
}
