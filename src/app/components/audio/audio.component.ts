import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent {
  @Input() text: string = "";

  playDescription() {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(this.text);
    utterance.lang = 'pt-PT';

    synth.speak(utterance);
  }
}