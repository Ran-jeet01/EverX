import { v2 as cloudinary } from 'cloudinary';

const config = useRuntimeConfig();

cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file: string | Buffer, folder: string = 'everx') => {
    try {
        const result = await cloudinary.uploader.upload(file as string, {
            folder,
        });
        return result;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
};

export default cloudinary;
