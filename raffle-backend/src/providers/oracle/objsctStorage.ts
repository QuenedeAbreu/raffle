// import * as objectStorage from "oci-objectstorage";
// const common = require('oci-common');
// import * as fs from "fs";
// import * as path from "path";

// const configFilePath = path.join(__dirname, '.oci', 'config');
// const provider = new common.ConfigFileAuthenticationDetailsProvider(configFilePath); 
// const client = new objectStorage.ObjectStorageClient({ authenticationDetailsProvider: provider });

// // Obter namespace do Bucket
// export async function getNamespace(): Promise<string> {
//   const response = await client.getNamespace({});
//   return response.value || "";
// }

// // Listar Buckets
// export async function listBuckets(compartmentId: string): Promise<any[]> {
//   const namespaceName = await getNamespace();
//   console.log(namespaceName);
//   const response = await client.listBuckets({
//     namespaceName,
//     compartmentId,
//   });
//   return response.items || [];
// }

// // Fazer upload de um arquivo para o Bucket
// // export async function uploadObject(bucketName: string, objectName: string, filePath: string): Promise<void> {
// //   const namespaceName = await getNamespace();

// //   const response = await client.putObject({
// //     namespaceName,
// //     bucketName,
// //     objectName,
// //     putObjectBody: fs.createReadStream(filePath), // Lê o arquivo do disco
// //   });

// //   console.log("Upload concluído! eTag:", response.eTag);
// // }

// // // Fazer download de um arquivo do Bucket
// // export async function downloadObject(bucketName: string, objectName: string, destinationPath: string): Promise<void> {
// //   const namespaceName = await getNamespace();

// //   const response = await client.getObject({
// //     namespaceName,
// //     bucketName,
// //     objectName,
// //   });

// //   // Escrever o conteúdo no destino
// //   const writeStream = fs.createWriteStream(destinationPath);
// //   response.value.pipe(writeStream);

// //   console.log(`Download concluído! Arquivo salvo em: ${destinationPath}`);
// // }
