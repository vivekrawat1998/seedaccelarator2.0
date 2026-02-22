// src/utils/trackDownload.js
import api from "../api/axios";

export const trackDownload = async (downloadData) => {
    if (!downloadData.userId) {
        console.warn("❌ No user ID for tracking");
        return false;
    }

    // ✅ MAP resource category to valid enum values
    const getValidCategory = (categoryName) => {
        const categoryMap = {
            "SAN Meet Reports": "report",
            "Product Diaries": "pdf",
            "report": "report",
            "dataset": "dataset",
            "image": "image",
            "pdf": "pdf",
            "excel": "excel"
        };
        return categoryMap[categoryName] || "pdf"; // Default to pdf
    };

    console.log("📤 Tracking download:", {
        userId: downloadData.userId,
        fileName: downloadData.fileName,
        mappedCategory: getValidCategory(downloadData.category)
    });

    try {
        const response = await api.post("/download-logs", {
            data: {
                "users_permissions_user": parseInt(downloadData.userId),
                fileName: downloadData.fileName,
                fileTitle: downloadData.fileTitle || downloadData.fileName,
                filePath: downloadData.filePath,
                fileSize: downloadData.fileSize || 0,
                downloadUrl: downloadData.downloadUrl || "",
                // ✅ USE VALID ENUM VALUE
                category: getValidCategory(downloadData.category)
            }
        });

        console.log("✅ TRACKED SUCCESSFULLY:", response.data);
        return true;
    } catch (error) {
        console.error("❌ ERROR:", error.response?.data);
        return false;
    }
};
