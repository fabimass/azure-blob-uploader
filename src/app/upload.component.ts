import { Component } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';

@Component({
    selector: 'upload-button',
    templateUrl: './upload.component.html',
    styleUrls: ['./app.component.css']
})
export class UploadComponent {
    
    selectFiles(): void {
      const fileInput = document.getElementById("file-input");
      fileInput?.click();
    }

    async uploadFiles(event: any): Promise<void> {
      const blobSasUrl = "placeholder";
      const containerName = "placeholder"
      const blobServiceClient = new BlobServiceClient(blobSasUrl);
      const containerClient = blobServiceClient.getContainerClient(containerName);
        
      try{
        console.log("Uploading files...");
        const promises = [];
        for (const file of event.target.files){
            const blockBlobClient = containerClient.getBlockBlobClient(file.name);
            promises.push(blockBlobClient.uploadBrowserData(file));
        }
        await Promise.all(promises);
        console.log("Uploaded!");
      }
      catch (error: any){
        console.log(error.message);
      }
    }
}