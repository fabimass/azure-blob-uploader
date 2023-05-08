import { Component } from '@angular/core';

@Component({
    selector: 'blob-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent {
    
    blobSas : string = "";
    blobContainer : string = "";
    consoleOutput : string = "Waiting for input...";

    onNotify(event: any): void {
        this.consoleOutput = event;
    }
}