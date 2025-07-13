import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAuthLogin from './hooks/useAuthLogin';

const AuthLoginPage = () => {
    const { username, password, error, handleSubmit, setUsername, setPassword, loading } = useAuthLogin();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit" disabled={loading}>
                    {loading ? 'Carregando...' : 'Login'}
                </Button>
            </form>
        </div>
    );
};

export default AuthLoginPage;
