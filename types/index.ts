export interface Video {
    UserId: string
    id: string
    title: string
    description: string
    publicId: string
    originalSize: number
    compressedSize: number
    duration: number
    createdAt: Date
    updatedAt: Date
}
export interface Pdf {
    UserId: string
    id: string
    title: string
    description: string
    publicId: string
    originalSize: number
    compressedSize: number
    createdAt: Date
    updatedAt: Date
}
export interface User {
    id: string
    email: string
    isPro: boolean
    razorpayId: string
    createdAt: Date
    updatedAt: Date
    videos: Video[]
    pdfs: Pdf[]
}

