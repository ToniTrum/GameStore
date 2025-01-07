import './FileViewer.css'

const FileViewer = ({ fileUrl, fileName }) => {
    const getFileType = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase()
        switch (extension) {
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
                return "image"
            case "mp4":
            case "webm":
                return "video"
            case "mp3":
            case "wav":
                return "audio"
            case "pdf":
                return "pdf"
            default:
                return "unknown"
        }
    }

    const fileType = getFileType(fileName)

    return (
        <div className="file-viewer">
            {fileType === "image" && <img src={fileUrl} alt={fileName} />}
            {fileType === "video" && (
                <video controls>
                    <source src={fileUrl} type="video/mp4" />
                    Ваш браузер не поддерживает воспроизведение видео.
                </video>
            )}
            {fileType === "audio" && <audio src={fileUrl} controls />}
            {fileType === "pdf" && <iframe src={fileUrl} title="PDF Viewer" />}
            {fileType === "unknown" && (
                <a href={fileUrl} download>
                    Скачать файл
                </a>
            )}
        </div>
    )
}

export default FileViewer
