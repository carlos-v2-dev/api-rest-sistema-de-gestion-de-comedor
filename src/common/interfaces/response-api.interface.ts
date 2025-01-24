import { HttpStatus } from "@nestjs/common";

export interface AllApiResponse<T>{
    meta: Metadata
    status: Status
    data: T[]
}

export interface OneApiResponse<T>{
    status: Status
    data: T
}

export interface Metadata {
    page: number;
    lastPage: number;
    limit: number;
    total: number;
}

interface Status{
    statusMsg: keyof typeof HttpStatus;
    statusCode: number; 
    error: string | null
}