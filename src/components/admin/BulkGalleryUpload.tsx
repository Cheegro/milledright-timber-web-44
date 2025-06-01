
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { uploadGalleryImage, fetchCategories, GalleryCategory } from '@/services/galleryService';
import { toast } from '@/hooks/use-toast';
import { useEffect } from 'react';

interface FileWithPreview extends File {
  preview?: string;
}

const BulkGalleryUpload = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedCount, setUploadedCount] = useState(0);

  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };
    loadCategories();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const filesWithPreview = selectedFiles.map(file => {
      const fileWithPreview = file as FileWithPreview;
      fileWithPreview.preview = URL.createObjectURL(file);
      return fileWithPreview;
    });
    setFiles(filesWithPreview);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleBulkUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one image to upload.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadedCount(0);

    const totalFiles = files.length;
    let successCount = 0;

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
      
      try {
        const result = await uploadGalleryImage(
          file,
          selectedCategory || null,
          fileName,
          `Uploaded from bulk upload - ${fileName}`
        );
        
        if (result) {
          successCount++;
        }
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
      }
      
      setUploadedCount(i + 1);
      setUploadProgress(((i + 1) / totalFiles) * 100);
    }

    setUploading(false);
    
    if (successCount === totalFiles) {
      toast({
        title: "All images uploaded successfully!",
        description: `${successCount} images have been added to your gallery.`,
      });
      setFiles([]);
    } else if (successCount > 0) {
      toast({
        title: "Partial upload completed",
        description: `${successCount} out of ${totalFiles} images uploaded successfully.`,
        variant: "default",
      });
    } else {
      toast({
        title: "Upload failed",
        description: "No images could be uploaded. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Upload Gallery Images</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="category">Category (Optional)</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No Category</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="files">Select Images</Label>
          <Input
            id="files"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
          />
        </div>

        {files.length > 0 && (
          <div>
            <h3 className="font-medium mb-3">Selected Images ({files.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-64 overflow-y-auto">
              {files.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-full h-20 object-cover rounded border"
                  />
                  <button
                    onClick={() => removeFile(index)}
                    disabled={uploading}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs hover:bg-red-600 disabled:opacity-50"
                  >
                    ×
                  </button>
                  <p className="text-xs mt-1 truncate" title={file.name}>
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{uploadedCount} / {files.length}</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={handleBulkUpload}
            disabled={files.length === 0 || uploading}
            className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown"
          >
            {uploading ? 'Uploading...' : `Upload ${files.length} Images`}
          </Button>
          
          {files.length > 0 && !uploading && (
            <Button
              variant="outline"
              onClick={() => setFiles([])}
            >
              Clear All
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkGalleryUpload;
