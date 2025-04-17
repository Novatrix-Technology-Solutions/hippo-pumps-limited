import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
}

export default function Edit({ mustVerifyEmail, status }: Props) {
    const { data, setData, patch, errors, processing } = useForm({
        name: '',
        email: '',
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <AdminLayout>
            <Head title="Profile" />
            <div className="container mx-auto py-6">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {status && (
                                <Alert className="mb-4">
                                    <AlertDescription>{status}</AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {mustVerifyEmail && (
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Your email address is unverified. Please check your email for a verification link.
                                        </p>
                                    </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Update Password</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <Label htmlFor="current_password">Current Password</Label>
                                    <Input
                                        id="current_password"
                                        type="password"
                                        value={data.current_password}
                                        onChange={(e) => setData('current_password', e.target.value)}
                                        className="mt-1"
                                    />
                                    {errors.current_password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.current_password}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="password">New Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="mt-1"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="password_confirmation">Confirm Password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="mt-1"
                                    />
                                    {errors.password_confirmation && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>
                                    )}
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>
                                        Update Password
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Delete Account</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                Once your account is deleted, all of its resources and data will be permanently deleted.
                                Before deleting your account, please download any data or information that you wish to retain.
                            </p>

                            <form onSubmit={submit} className="mt-4">
                                <div>
                                    <Label htmlFor="current_password">Password</Label>
                                    <Input
                                        id="current_password"
                                        type="password"
                                        value={data.current_password}
                                        onChange={(e) => setData('current_password', e.target.value)}
                                        className="mt-1"
                                    />
                                    {errors.current_password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.current_password}</p>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <Button variant="destructive" disabled={processing}>
                                        Delete Account
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}