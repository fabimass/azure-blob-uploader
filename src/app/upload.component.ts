import { Component, Input, EventEmitter, Output } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';

@Component({
    selector: 'upload-button',
    templateUrl: './upload.component.html',
    styleUrls: ['./app.component.css']
})
export class UploadComponent {
    
    @Input() blobSasUrl: string = "";
    @Input() containerName: string = "";
    @Output() statusMessage: EventEmitter<string> = new EventEmitter<string>;

    selectFiles(): void {
      const fileInput = document.getElementById("file-input");
      fileInput?.click();
    }

    async uploadFiles(event: any): Promise<void> {
       
      try{
        const blobServiceClient = new BlobServiceClient(this.blobSasUrl);
        const containerClient = blobServiceClient.getContainerClient(this.containerName);

        this.statusMessage.emit("Uploading files...");
        const promises = [];
        for (const file of event.target.files){
            const blockBlobClient = containerClient.getBlockBlobClient(file.name);
            promises.push(blockBlobClient.uploadBrowserData(file));
        }
        await Promise.all(promises);
        this.statusMessage.emit("Uploaded!");
      }
      catch (error: any){
        this.statusMessage.emit(error.message);
      }
    }
}