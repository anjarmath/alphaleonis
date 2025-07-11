import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLoginForm from "@/features/auth/form/LoginForm";
import React from "react";

const AdminLoginPage = () => {
  return (
    <div className="flex h-svh w-full items-center justify-center p-3">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminLoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
