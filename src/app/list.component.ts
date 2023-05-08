import { Component, Input, EventEmitter, Output } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';

@Component({
    selector: 'list-button',
    templateUrl: './list.component.html',
    styleUrls: ['./app.component.css']
})
export class ListComponent {
    
    @Input() blobSasUrl: string = "";
    @Input() containerName: string = "";
    @Output() statusMessage: EventEmitter<string> = new EventEmitter<string>;

    async listFiles(): Promise<void> {
       
      let fileList = "<ul>"
      try{
        const blobServiceClient = new BlobServiceClient(this.blobSasUrl);
        const containerClient = blobServiceClient.getContainerClient(this.containerName);

        this.statusMessage.emit("Getting files...");
        let iter = containerClient.listBlobsFlat();
        let blobItem = await iter.next();
        while(!blobItem.done){
            fileList += `<li>${blobItem.value.name}</li>`;
            blobItem = await iter.next();
        }
        fileList += "</ul>";
        this.statusMessage.emit(fileList);
      }
      catch (error: any){
        this.statusMessage.emit(error.message);
      }
    }
}