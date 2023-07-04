import AuthLayout from '@/components/common/auth';
import AdminLayout from '@/layout/admin';
import MainLayout from '@/layout/main';
import * as React from 'react';

export interface WorksPageProps {
}

export default function WorksPage (props: WorksPageProps) {
  return (
    <AuthLayout>
      Works Page
    </AuthLayout>
  );
}
WorksPage.Layout = MainLayout
