import {listBuckets} from '../providers/oracle/objsctStorage'
import * as oci from 'oci-objectstorage';
import { ConfigFileAuthenticationDetailsProvider  } from 'oci-common';
import path from 'path';
import * as fs from "fs";

const configFilePath = path.join(__dirname,'..','providers','oracle' ,'.oci', 'config');

export const listBucketsOracle = async () => {
  try {
    const compartmentId = "ocid1.tenancy.oc1..aaaaaaaaxfj3ognohyw6553sjzcx2jgye34pcvwwbz2mzcyzzb32oo5f6sqa"; // Substitua pelo OCID do compartimento

    // Listar buckets
    const buckets = await listBuckets(compartmentId);
    // console.log("Buckets disponíveis:", buckets);
    console.log("Buckets disponíveis:", buckets);
    return buckets;

  } catch (error) {
    console.error("Erro:", error);
  }
}
export async function listItemsOracle(bucketName: string, region: string): Promise<any> {
  try {
    // Autenticação usando o arquivo de configuração padrão (~/.oci/config)
    // const configFilePath = path.join(__dirname,'..','providers','oracle' ,'.oci', 'config');
    const provider = new ConfigFileAuthenticationDetailsProvider(configFilePath);

    // Criação do cliente de ObjectStorage com a autenticação configurada
    const client = new oci.ObjectStorageClient({
      authenticationDetailsProvider: provider
    });
  
    // Obtém o namespace necessário para as operações
    const namespaceResponse = await client.getNamespace({});
    // console.log('Namespace:', namespaceResponse.value);
    const namespaceName = namespaceResponse.value;

    // Criação do pedido para listar objetos no bucket
    const request = {
      namespaceName: namespaceName,
      bucketName: bucketName,
      limit: 100, // Defina o limite de objetos a listar
      region
    };

    // Usando o método correto para listar os objetos
    const response = await client.listObjects(request);
   
    // console.log('Objetos listados:', response.listObjects.objects || []);
   // Processamento dos objetos listados
   return response.listObjects.objects || [];
  } catch (error) {
    console.error('Erro ao listar objetos:', error);
  }
}
// Função para criar a url do item
export async function urlItemOracle( bucketName: string, objectName: string): Promise<string> {

    // Autenticação usando o arquivo de configuração padrão (~/.oci/config)
    // const configFilePath = path.join(__dirname,'..','providers','oracle' ,'.oci', 'config');
    const provider = new ConfigFileAuthenticationDetailsProvider(configFilePath);

    // Criação do cliente de ObjectStorage com a autenticação configurada
    const client = new oci.ObjectStorageClient({
      authenticationDetailsProvider: provider
    });
  
    try {
      // Obter namespace
      const namespaceResponse = await client.getNamespace({});
      const namespaceName = namespaceResponse.value;
  
      // Região especificada no provedor de autenticação
      const {regionId} = provider.getRegion();
  
      // Construir a URL
      const url = `https://objectstorage.${regionId}.oraclecloud.com/n/${namespaceName}/b/${bucketName}/o/${encodeURIComponent(objectName)}`;
      return url;
    } catch (error) {
      console.error("Erro ao obter a URL do objeto:", error);
      throw error;
    }
}
// upload de um arquivo para o bucket Falta fatorar o path do arquivo
export async function uploadObject(bucketName: string, objectName: string, filePath: string): Promise<void> {
  // const configFilePath = path.join(__dirname,'..','public','image' ,'perfil');
  
  try {
    const pathFile = path.join(__dirname,'..','public','image','perfil','imagePerfil-1732812023981-979225965.png');

    // Autenticação usando o arquivo de configuração padrão (~/.oci/config)
    const provider  = new ConfigFileAuthenticationDetailsProvider(configFilePath);
    const client = new oci.ObjectStorageClient({
      authenticationDetailsProvider: provider
    });
    // Obtém o namespace necessário para as operações
    const namespaceResponse = await client.getNamespace({});
    const namespaceName = namespaceResponse.value;
    // Criação do pedido para listar objetos no bucket 
    const request = {
      namespaceName: namespaceName,
      bucketName: bucketName,
      objectName: objectName,
      contentLength: fs.statSync(pathFile).size,
      putObjectBody: fs.createReadStream(pathFile),
      region: 'sa-saopaulo-1'
    };
    // Usando o método correto para listar os objetos
    const response = await client.putObject(request);
    console.log('Objeto enviado:', response);
    console.log('Objeto enviado com sucesso!');

  } catch (error) {
    console.error('Erro ao enviar objeto:', error);
  }
}