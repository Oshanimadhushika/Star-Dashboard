'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLocalStoragedata } from '@/app/helpers/storageHelper';

export default function DashboardOverview() {
    const router = useRouter();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const userData = getLocalStoragedata("userData");
        if (!userData || !userData.isActive) {
            router.push('/login');
        } else {
            setIsChecked(true);
        }
    }, [router]);

    if (!isChecked) {
        return null;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <p>Welcome to the Voice Star Super Admin Dashboard.</p>
            </div>
        </div>
    );
}
