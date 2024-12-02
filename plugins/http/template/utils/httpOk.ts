export default function httpOk (message: string, data: any) {
    return {
        success: true,
        message,
        ...data
    }
}