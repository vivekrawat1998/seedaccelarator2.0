import { trackDownload } from "../utils/trackDownload";
import { useAuth } from "../context/AuthProvider";

export const DownloadButton = ({ file }) => {
    const { user } = useAuth();

    const handleDownload = async () => {
        // Track download FIRST
        await trackDownload({
            userId: user?.id,
            fileName: file.name,
            fileTitle: file.title,
            filePath: file.path,
            fileSize: file.size,
            downloadUrl: file.url,
            category: file.category || "other"
        });

        // THEN download file
        window.location.href = file.downloadUrl;
    };

    return (
        <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
            📥 Download
        </button>
    );
};
