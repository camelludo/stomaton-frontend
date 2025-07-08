"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingUp, MessageSquare, Search, Zap } from "lucide-react"
import { mockKnowledgeGaps } from "@/mocks"

export default function KnowledgeGapsPage() {
  const [gaps, setGaps] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSource, setSelectedSource] = useState<string>("all")

  useEffect(() => {
    loadKnowledgeGaps()
  }, [])

  const loadKnowledgeGaps = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setGaps(mockKnowledgeGaps)
    } catch (err) {
      console.error("Failed to load knowledge gaps")
    } finally {
      setIsLoading(false)
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>
      case 'low':
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getGapTypeBadge = (gapType: string) => {
    switch (gapType) {
      case 'missing_content':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Missing Content</Badge>
      case 'incomplete_data':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Incomplete Data</Badge>
      case 'outdated_info':
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Outdated Info</Badge>
      default:
        return <Badge variant="outline">{gapType}</Badge>
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4" />
      case 'failed_search':
        return <Search className="h-4 w-4" />
      case 'telegram':
        return <Zap className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
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

  const filteredGaps = selectedSource === "all" 
    ? gaps 
    : gaps.filter(gap => gap.source === selectedSource)

  const gapsBySource = gaps.reduce((acc, gap) => {
    acc[gap.source] = (acc[gap.source] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const totalGaps = gaps.length
  const highPriorityGaps = gaps.filter(gap => gap.priority === 'high').length

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <AlertTriangle className="h-8 w-8 text-orange-500" />
          Knowledge Gaps Analysis
        </h1>
        <p className="text-muted-foreground text-lg">
          Monitor and analyze gaps in the stone knowledge database
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{totalGaps}</p>
                <p className="text-sm text-muted-foreground">Total Gaps</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-600">{highPriorityGaps}</p>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{gapsBySource.failed_search || 0}</p>
                <p className="text-sm text-muted-foreground">Search Failures</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{gapsBySource.whatsapp || 0}</p>
                <p className="text-sm text-muted-foreground">WhatsApp Queries</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Source Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter by Source</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedSource === "all" ? "default" : "outline"}
              onClick={() => setSelectedSource("all")}
            >
              All Sources ({totalGaps})
            </Button>
            <Button
              variant={selectedSource === "failed_search" ? "default" : "outline"}
              onClick={() => setSelectedSource("failed_search")}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Failed Search ({gapsBySource.failed_search || 0})
            </Button>
            <Button
              variant={selectedSource === "whatsapp" ? "default" : "outline"}
              onClick={() => setSelectedSource("whatsapp")}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp ({gapsBySource.whatsapp || 0})
            </Button>
            <Button
              variant={selectedSource === "telegram" ? "default" : "outline"}
              onClick={() => setSelectedSource("telegram")}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Telegram ({gapsBySource.telegram || 0})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Gaps Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Knowledge Gaps ({filteredGaps.length})
          </CardTitle>
          <CardDescription>
            Identified gaps in the stone knowledge database that need attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading knowledge gaps...
            </div>
          ) : filteredGaps.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No knowledge gaps found for the selected source.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stone Name</TableHead>
                  <TableHead>Gap Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Identified</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGaps.map((gap) => (
                  <TableRow key={gap.id}>
                    <TableCell className="font-medium">{gap.stone_name}</TableCell>
                    <TableCell>{getGapTypeBadge(gap.gap_type)}</TableCell>
                    <TableCell>{getPriorityBadge(gap.priority)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getSourceIcon(gap.source)}
                        <span className="capitalize">{gap.source.replace('_', ' ')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {gap.frequency}x
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(gap.identified_at)}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-sm">
                      {gap.description}
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