import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AuthLoginCardProps {
  username: string
  setUsername: (username: string) => void
  password: string
  setPassword: (password: string) => void
  error: string | null
  loading: boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const AuthLoginCard = ({
  username,
  setUsername,
  password,
  setPassword,
  error,
  loading,
  handleSubmit,
}: AuthLoginCardProps) => {
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button disabled variant="link">
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <p className="ml-auto inline-block text-sm text-muted-foreground cursor-default underline-offset-4 hover:underline">
                  Forgot your password?
                </p>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </Button>
          {error && (
            <div className="bg-red-500/30 text-red-500 text-sm text-center p-2 rounded-md">
              {error}
            </div>
          )}
        </CardFooter>
      </Card>
    </form>
  )
}

export default AuthLoginCard
