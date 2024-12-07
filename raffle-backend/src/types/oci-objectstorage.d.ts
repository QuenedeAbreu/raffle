declare module "oci-objectstorage" {
  import * as stream from "stream";
  type listObjects = {
    listObjects: {
    objects: {
      name: string;
    }[]};
  };
  export class ObjectStorageClient {
    // esta função deve retornar uma lista de objetos    
    listObjects(request: { namespaceName: string; bucketName: string; limit: number; }): Promise<listObjects>;
   
    region: string;
    constructor(options: ObjectStorageClientOptions);
    getNamespace(request: GetNamespaceRequest): Promise<GetNamespaceResponse>;
    listBuckets(request: ListBucketsRequest): Promise<ListBucketsResponse>;
    putObject(request: PutObjectRequest): Promise<PutObjectResponse>;
    getObject(request: GetObjectRequest): Promise<GetObjectResponse>;

  }

  export interface ObjectStorageClientOptions {
    authenticationDetailsProvider: any;
  }

  export interface GetNamespaceRequest {}

  export interface GetNamespaceResponse {
    value: string;
  }

  export interface ListBucketsRequest {
    namespaceName: string;
    compartmentId: string;
  }

  export interface ListBucketsResponse {
    items: BucketSummary[];
  }

  export interface BucketSummary {
    name: string;
    createdBy: string;
    timeCreated: Date;
  }

  export interface PutObjectRequest {
    namespaceName: string;
    bucketName: string;
    objectName: string;
    putObjectBody: stream.Readable;
  }

  export interface PutObjectResponse {
    eTag: string;
  }

  export interface GetObjectRequest {
    namespaceName: string;
    bucketName: string;
    objectName: string;
  }

  export interface GetObjectResponse {
    value: stream.Readable;
  }
}
