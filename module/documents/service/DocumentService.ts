import ApiServer from "@/module/system/service/ApiServer";
import { DocumentDTO } from "../dto/DocumentDTO";

class DocumentService extends ApiServer {

    /**
     * Upload multiple documents
     * @param files - Array of files to be uploaded
     * @param token - Authentication token (if required)
     * @returns Promise containing an array of uploaded document details (url, type)
     */

    uploadDocuments = async (files: File[], token: string): Promise<DocumentDTO[]> => {
        const formData = new FormData();

        files.forEach((file) => {
            formData.append("files", file);
        });

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await this.api<FormData, any>(
            `/document/upload`,
            "POST",
            formData,
            token, true
        );

        if (response.status === 200) {
            const data = await response.json();
            return data as DocumentDTO[];
        } else {
            const errorData = await response.json();
            return Promise.reject(errorData.message || "Failed to upload documents");
        }
    };


    /**
     * Fetch a document by its name
     * @param name - Document name
     * @param token - Authentication token (if required)
     * @returns Promise containing the document details
     */
    getDocumentByName = async (name: string, token: string): Promise<DocumentDTO> => {
        const response = await this.api<null, any>(
            `/document/${name}`,
            "GET",
            null,
            token,
            true
        );

        if (response.status === 200) {
            const data = await response.json();
            return data as DocumentDTO;
        } else {
            const errorData = await response.json();
            return Promise.reject(errorData.message || "Failed to fetch document");
        }
    };

    /**
     * Delete a document by its name
     * @param name - Document name
     * @param token - Authentication token
     * @returns Promise with success message
     */
    deleteDocument = async (name: string, token: string): Promise<string> => {
        const response = await this.api<null, any>(
            `/document/${name}`,
            "DELETE",
            null,
            token,
            true
        );

        if (response.status === 200) {
            const data = await response.text();
            return data;
        } else {
            const errorData = await response.json();
            return Promise.reject(errorData.message || "Failed to delete document");
        }
    };

    /**
     * Fetch all documents
     * @param token - Authentication token (if required)
     * @returns Promise containing an array of all document details
     */
    getAllDocuments = async (token: string): Promise<DocumentDTO[]> => {
        const response = await this.api<null, any>(
            `/document/all`,
            "GET",
            null,
            token
        );

        if (response.status === 200) {
            const data = await response.json();
            return data as DocumentDTO[];
        } else {
            const errorData = await response.json();
            return Promise.reject(errorData.message || "Failed to fetch documents");
        }
    };
}

export default DocumentService;
