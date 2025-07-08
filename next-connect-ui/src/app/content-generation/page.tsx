"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input" 
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sparkles, FileText, MessageSquare, AlertCircle } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { 
  mockContentGeneration, 
  mockSocialContent, 
  mockFAQContent 
} from "@/mocks"

export default function ContentGenerationPage() {
  const [stoneName, setStoneName] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [socialContent, setSocialContent] = useState<any>(null)
  const [faqContent, setFaqContent] = useState<any>(null)
  const [error, setError] = useState("")

  const handleGenerateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stoneName.trim()) {
      setError("Please enter a stone name")
      return
    }

    setIsGenerating(true)
    setError("")

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Use mock data for now
      const mockResponse = {
        ...mockContentGeneration,
        content: {
          ...mockContentGeneration.content,
          name: stoneName
        }
      }
      
      setGeneratedContent(mockResponse)
      setSocialContent(null)
      setFaqContent(null)
    } catch (err) {
      setError("Failed to generate stone profile. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateSocial = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSocialContent(mockSocialContent)
    } catch (err) {
      setError("Failed to generate social content.")
    }
  }

  const handleGenerateFAQ = async () => {
    try {
      // Simulate API call  
      await new Promise(resolve => setTimeout(resolve, 1500))
      setFaqContent(mockFAQContent)
    } catch (err) {
      setError("Failed to generate FAQs.")
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-yellow-500" />
          STOMATON Content Generation
        </h1>
        <p className="text-muted-foreground text-lg">
          Generate comprehensive stone profiles and derivative content with TileScribe
        </p>
      </div>

      {/* Stone Name Input */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Stone Profile</CardTitle>
          <CardDescription>
            Enter a stone name to generate a comprehensive profile with geological information, market data, and more
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerateProfile} className="space-y-4">
            <div>
              <Label htmlFor="stoneName">Stone Name</Label>
              <Input
                id="stoneName"
                type="text"
                placeholder="e.g., Rainbow Moonstone, Paraiba Tourmaline"
                value={stoneName}
                onChange={(e) => setStoneName(e.target.value)}
                className="text-lg"
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button 
              type="submit" 
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  Generating Profile...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Profile
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Generated Content */}
      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Stone Profile: {generatedContent.content.name}</CardTitle>
            <CardDescription>
              Processing time: {generatedContent.processing_time}s | Cost: ${generatedContent.cost.total}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{generatedContent.content.wiki_content}</ReactMarkdown>
            </div>
            
            {/* Metadata */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Categories & Cross-links</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Type:</strong> {generatedContent.content.categories.type}</p>
                <p><strong>Phenomenon:</strong> {generatedContent.content.categories.phenomenon}</p>
                <p><strong>Related Stones:</strong> {generatedContent.content.cross_links.join(", ")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TileScribe Actions */}
      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              TileScribe Actions
            </CardTitle>
            <CardDescription>
              Generate derivative content from your stone profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Button 
                onClick={handleGenerateSocial}
                variant="outline"
                className="h-12"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Generate Social Post
              </Button>
              <Button 
                onClick={handleGenerateFAQ}
                variant="outline"
                className="h-12"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate FAQs
              </Button>
            </div>

            {/* Social Content */}
            {socialContent && (
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-semibold">Social Media Content</h4>
                
                {/* Twitter Thread */}
                <div>
                  <Label>Twitter Thread</Label>
                  <div className="space-y-2 mt-2">
                    {socialContent.content.tweet_thread.map((tweet: string, index: number) => (
                      <Textarea 
                        key={index}
                        value={tweet}
                        readOnly
                        className="min-h-[80px]"
                      />
                    ))}
                  </div>
                </div>

                {/* Instagram Caption */}
                <div>
                  <Label>Instagram Caption</Label>
                  <Textarea 
                    value={socialContent.content.instagram_caption}
                    readOnly
                    className="min-h-[200px] mt-2"
                  />
                </div>
              </div>
            )}

            {/* FAQ Content */}
            {faqContent && (
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-semibold">Frequently Asked Questions</h4>
                <Accordion type="single" collapsible className="w-full">
                  {faqContent.content.faqs.map((faq: any) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}