<?php

declare(strict_types=1);

namespace App\Infrastructure\Storage;

use RuntimeException;

class FileUploader
{
    private string $uploadDirectory;
    private int $maxWidth = 1200;
    private int $maxHeight = 1200;
    private int $quality = 92;

    public function __construct(string $uploadDirectory)
    {
        $this->uploadDirectory = rtrim($uploadDirectory, '/');
        
        if (!is_dir($this->uploadDirectory)) {
            mkdir($this->uploadDirectory, 0755, true);
        }
    }

    /**
     * Upload and compress an image file
     * 
     * @param array $file The uploaded file from $_FILES
     * @return string The relative path to the uploaded file
     * @throws RuntimeException
     */
    public function upload(array $file): string
    {
        if (!isset($file['tmp_name']) || !is_uploaded_file($file['tmp_name'])) {
            throw new RuntimeException('Invalid file upload');
        }

        if ($file['error'] !== UPLOAD_ERR_OK) {
            throw new RuntimeException('File upload error: ' . $file['error']);
        }

        // Validate file type
        $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        if (!in_array($mimeType, $allowedTypes)) {
            throw new RuntimeException('Invalid file type. Only images are allowed.');
        }

        // Generate unique filename
        $extension = $this->getExtensionFromMime($mimeType);
        $filename = uniqid('product_', true) . '.' . $extension;
        $filepath = $this->uploadDirectory . '/' . $filename;

        // Check if GD extension is available
        // if (!extension_loaded('gd')) {
        //     // If GD is not available, just move the file without compression
        //     if (!move_uploaded_file($file['tmp_name'], $filepath)) {
        //         throw new RuntimeException('Failed to move uploaded file');
        //     }
        //     return 'uploads/' . $filename;
        // }

        // Load and compress image
        $image = $this->loadImage($file['tmp_name'], $mimeType);
        
        if ($image === false) {
            // Fallback: just move the file without compression
            if (!move_uploaded_file($file['tmp_name'], $filepath)) {
                throw new RuntimeException('Failed to move uploaded file');
            }
            return 'uploads/' . $filename;
        }

        // Resize if needed
        $image = $this->resizeImage($image);

        // Save compressed image
        $this->saveImage($image, $filepath, $mimeType);
        imagedestroy($image);

        return 'uploads/' . $filename;
    }

    /**
     * Delete a file
     * 
     * @param string $filepath The relative path to the file
     * @return bool
     */
    public function delete(string $filepath): bool
    {
        $fullPath = __DIR__ . '/../../../public/' . ltrim($filepath, '/');
        
        if (file_exists($fullPath) && is_file($fullPath)) {
            return unlink($fullPath);
        }

        return false;
    }

    private function loadImage(string $filepath, string $mimeType)
    {
        switch ($mimeType) {
            case 'image/jpeg':
            case 'image/jpg':
                return imagecreatefromjpeg($filepath);
            case 'image/png':
                return imagecreatefrompng($filepath);
            case 'image/gif':
                return imagecreatefromgif($filepath);
            case 'image/webp':
                return imagecreatefromwebp($filepath);
            default:
                return false;
        }
    }

    private function resizeImage($image)
    {
        $width = imagesx($image);
        $height = imagesy($image);

        // Calculate new dimensions
        if ($width <= $this->maxWidth && $height <= $this->maxHeight) {
            return $image; // No resize needed
        }

        $ratio = min($this->maxWidth / $width, $this->maxHeight / $height);
        $newWidth = (int) ($width * $ratio);
        $newHeight = (int) ($height * $ratio);

        // Create new image
        $newImage = imagecreatetruecolor($newWidth, $newHeight);

        // Preserve transparency for PNG and GIF
        imagealphablending($newImage, false);
        imagesavealpha($newImage, true);

        // Resize
        imagecopyresampled(
            $newImage,
            $image,
            0, 0, 0, 0,
            $newWidth,
            $newHeight,
            $width,
            $height
        );

        imagedestroy($image);
        return $newImage;
    }

    private function saveImage($image, string $filepath, string $mimeType): void
    {
        switch ($mimeType) {
            case 'image/jpeg':
            case 'image/jpg':
                imagejpeg($image, $filepath, $this->quality);
                break;
            case 'image/png':
                // PNG quality is 0-9, convert from 0-100
                $pngQuality = (int) (9 - ($this->quality / 100) * 9);
                imagepng($image, $filepath, $pngQuality);
                break;
            case 'image/gif':
                imagegif($image, $filepath);
                break;
            case 'image/webp':
                imagewebp($image, $filepath, $this->quality);
                break;
        }
    }

    private function getExtensionFromMime(string $mimeType): string
    {
        $map = [
            'image/jpeg' => 'jpg',
            'image/jpg' => 'jpg',
            'image/png' => 'png',
            'image/gif' => 'gif',
            'image/webp' => 'webp',
        ];

        return $map[$mimeType] ?? 'jpg';
    }
}

