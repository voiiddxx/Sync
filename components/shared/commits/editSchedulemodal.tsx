import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar, GitBranch, GitCommit, FileText, User, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function EditScheduleModal({data , user}:any) {
  const [commitMessage, setCommitMessage] = useState("Initial commit message")
  const [selectedBranch, setSelectedBranch] = useState("main")
  const [forceGit, setForceGit] = useState(false)

  return (
    <Card className="w-[600px] max-w-4xl mx-auto bg-white shadow-lg border border-gray-200 font-Poppins">
      <CardHeader className="space-y-1 border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <CardTitle className="text-2xl font-semibold text-gray-800">Schedule Commit</CardTitle>
          </div>
          <Badge variant="outline" className="text-blue-500 border-blue-500">Requested</Badge>
        </div>
        <p className="text-sm text-gray-500">Plan your code changes for future deployment</p>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <GitBranch className="h-4 w-4" />
            <span>repo-name</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>VD</AvatarFallback>
            </Avatar>
            <span>Created by voiiddxx 2 days ago</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="commit-id" className="text-sm font-medium text-gray-700">
            Commit ID
          </Label>
          <div className="flex items-center space-x-2">
            <GitCommit className="h-4 w-4 text-gray-500" />
            <Input id="commit-id" value="a1b2c3d" readOnly className="bg-gray-100" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="commit-message" className="text-sm font-medium text-gray-700">
            Commit Message
          </Label>
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-gray-500" />
            <Input
              id="commit-message"
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="branch-select" className="text-sm font-medium text-gray-700">
            Branch
          </Label>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger id="branch-select" className="w-full">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main">main</SelectItem>
              <SelectItem value="develop">develop</SelectItem>
              <SelectItem value="feature">feature</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="scheduled-time" className="text-sm font-medium text-gray-700">
            Scheduled Time
          </Label>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <Input id="scheduled-time" type="datetime-local" defaultValue="2023-06-01T09:00" />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">File Changes</Label>
          <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded border border-gray-200">
            <p>Modified: src/components/Header.tsx</p>
            <p>Added: src/utils/helpers.ts</p>
            <p>Deleted: src/styles/unused.css</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="force-git" className="text-sm font-medium text-gray-700">
            Force Git Push
          </Label>
          <Switch
            id="force-git"
            checked={forceGit}
            onCheckedChange={setForceGit}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 border-t border-gray-200 pt-4">
        <Button variant="outline" className="text-black border-black hover:bg-gray-100">
          Cancel
        </Button>
        <Button className="bg-black text-white hover:bg-gray-800">
          Schedule
        </Button>
      </CardFooter>
    </Card>
  )
}