"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, Upload, Trash2, FileText, AlertCircle } from "lucide-react"
import { mockRAGDocuments } from "@/mocks"

export default function RAGManagementPage() {
  const [documents, setDocuments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    // Load documents on page mount
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setDocuments(mockRAGDocuments)
    } catch (err) {
      setError("Failed to load documents")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files)
    setError("")
  }

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setError("Please select files to upload")
      return
    }

    setIsUploading(true)
    setError("")

    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Add mock documents for each uploaded file
      const newDocs = Array.from(selectedFiles).map((file, index) => ({
        document_id: `doc-${Date.now()}-${index}`,
        file_name: file.name,
        status: "processing",
        uploaded_at: new Date().toISOString(),
        size_mb: (file.size / (1024 * 1024)).toFixed(1),
        type: file.name.split('.').pop()?.toLowerCase() || 'unknown'
      }))

      setDocuments(prev => [...newDocs, ...prev])
      setSelectedFiles(null)
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement
      if (fileInput) fileInput.value = ''
      
    } catch (err) {
      setError("Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (documentId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setDocuments(prev => prev.filter(doc => doc.document_id !== documentId))
    } catch (err) {
      setError("Failed to delete document")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'indexed':
        return <Badge variant="default" className="bg-green-500">Indexed</Badge>
      case 'processing':
        return <Badge variant="secondary">Processing</Badge>
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatFileSize = (sizeMb: string | number) => {
    const size = typeof sizeMb === 'string' ? parseFloat(sizeMb) : sizeMb
    return `${size.toFixed(1)} MB`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Database className="h-8 w-8 text-blue-500" />
          RAG Database Management
        </h1>
        <p className="text-muted-foreground text-lg">
          Upload and manage documents for the knowledge base
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Documents
          </CardTitle>
          <CardDescription>
            Upload PDF, TXT, MD, DOCX, or HTML files to add to the knowledge base
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              id="file-upload"
              type="file"
              multiple
              accept=".pdf,.txt,.md,.docx,.html"
              onChange={handleFileSelect}
              className="cursor-pointer"
            />
          </div>
          
          {selectedFiles && selectedFiles.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Selected: {Array.from(selectedFiles).map(f => f.name).join(", ")}
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleUpload} 
            disabled={isUploading || !selectedFiles}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Upload className="h-4 w-4 mr-2 animate-pulse" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documents ({documents.length})
          </CardTitle>
          <CardDescription>
            Manage uploaded documents and their processing status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading documents...
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No documents uploaded yet. Upload some files to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.document_id}>
                    <TableCell className="font-medium">{doc.file_name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{doc.type.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>{formatFileSize(doc.size_mb)}</TableCell>
                    <TableCell>{getStatusBadge(doc.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(doc.uploaded_at)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(doc.document_id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}