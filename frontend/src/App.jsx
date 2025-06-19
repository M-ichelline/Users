import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Users, UserPlus, AlertCircle, CheckCircle } from 'lucide-react'
import './App.css'

const API_BASE_URL = 'http://localhost:8080'

function App() {
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [searchId, setSearchId] = useState('')
  const [searchResult, setSearchResult] = useState(null)

  
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`)
      if (response.ok) {
        const data = await response.json()
        setUsers(Object.values(data))
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }


  const createUser = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim()) {
      setMessage({ type: 'error', text: 'Please fill in all fields' })
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: `User created successfully with ID: ${data.id}` })
        setFormData({ name: '', email: '' })
        fetchUsers()
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to create user' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please check if the backend is running.' })
    } finally {
      setLoading(false)
    }
  }

  
  const searchUser = async () => {
    if (!searchId.trim()) {
      setMessage({ type: 'error', text: 'Please enter a user ID' })
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users/${searchId}`)
      const data = await response.json()

      if (response.ok) {
        setSearchResult(data)
        setMessage({ type: 'success', text: 'User found!' })
      } else {
        setSearchResult(null)
        setMessage({ type: 'error', text: data.error || 'User not found' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please check if the backend is running.' })
    }
  }


  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

 
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
       
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">User Management System</h1>
          <p className="text-gray-600">Create and manage users with our REST API</p>
        </div>

      
        {message.text && (
          <Alert className={message.type === 'error' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}>
            {message.type === 'error' ? (
              <AlertCircle className="h-4 w-4 text-red-600" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
            <AlertDescription className={message.type === 'error' ? 'text-red-700' : 'text-green-700'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Create New User
              </CardTitle>
              <CardDescription>
                Add a new user to the system using the POST /users endpoint
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={createUser} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter user name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter user email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Creating...' : 'Create User'}
                </Button>
              </form>
            </CardContent>
          </Card>

        
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Search User by ID
              </CardTitle>
              <CardDescription>
                Find a specific user using the GET /users/:id endpoint
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="searchId">User ID</Label>
                  <Input
                    id="searchId"
                    type="text"
                    placeholder="Enter user ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                  />
                </div>
                <Button onClick={searchUser} className="w-full">
                  Search User
                </Button>
                
                {searchResult && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h4 className="font-semibold mb-2">User Details:</h4>
                    <p><strong>ID:</strong> {searchResult.id}</p>
                    <p><strong>Name:</strong> {searchResult.name}</p>
                    <p><strong>Email:</strong> {searchResult.email}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

      
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              All Users ({users.length})
            </CardTitle>
            <CardDescription>
              List of all users retrieved from the GET /users endpoint
            </CardDescription>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No users found. Create your first user above!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                  <div key={user.id} className="p-4 border rounded-lg bg-white">
                    <h4 className="font-semibold text-lg">{user.name}</h4>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-400 mt-2">ID: {user.id}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4">
              <Button onClick={fetchUsers} variant="outline" className="w-full">
                Refresh Users List
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App

